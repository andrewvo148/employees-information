"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Input, message, Modal, Popover, Table, UploadProps } from "antd";
import type {
  GetProp,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { FileTextOutlined, ImportOutlined, InboxOutlined, MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import moment from "moment";
import * as fs from "fs";
import { IPatch, patchDocument, PatchType, TextRun } from "docx";

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import Employees from "../../../components/employees";
import Dragger from "antd/es/upload/Dragger";
import qs from 'qs';

type TableRowSelection<T> = TableProps<T>["rowSelection"];
const dateFormat = 'DD/MM/YYYY';

interface DataType {
  id: string;
  name: string;
  age: number;
  address: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Mã nhân viên",
    dataIndex: "employeeCode",
    sorter: true,
    fixed: "left",
    width: 100,
    render: (text, record) => (
      <a href={`/tasks/profile/create/?id=${record.id}`}>{text}</a>
  ),
  },

  {
    title: "Họ và tên",
    dataIndex: "fullName",
    sorter: true,
    fixed: "left",
    width: 100,
  },

  {
    title: "Giới tính",
    dataIndex: "genderName",
    sorter: true
  },

  {
    title: "Ngày sinh",
    dataIndex: "birthDay",
    sorter: true,
    render: (text, record) => (
      moment({text}).format(dateFormat)
  ),
  },

  {
    title: "ĐT di động",
    dataIndex: "mobilePhone",
    sorter: true,
  },

  {
    title: "Email cơ quan",
    dataIndex: "officeEmail",

  },
  

];


let PizZipUtils : any = null;
if (typeof window !== 'undefined') {
  import('pizzip/utils/index.js').then(function (r) {
    PizZipUtils = r;
  });
}


function loadFile(url: string, callback: any) {
  PizZipUtils.getBinaryContent(url, callback);
}


const getParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const url = "/api/employees";

function ProfilePage() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });


  
  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys.length > 0) {
      setShowAddBtn(false);
    } else {
      setShowAddBtn(true);
    }
    
  };


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      //setIsModalOpen(false);
      const body = { ids: selectedRowKeys };
      await fetch('/api/employees', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setIsModalOpen(false);
     // fetchData();
      setSelectedRowKeys([]);
    } catch (error) {
      console.error(error);
    }
     
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const generateContract = () => {
    loadFile('/hdtv.docx', function (error: any, content: any) {
    if (error) {
      throw error;
    }


    data?.forEach(employee => {
      if (selectedRowKeys.includes(employee.id)) {
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          linebreaks: true,
          paragraphLoop: true,
        });
        console.log(employee);
    
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render({
         ...employee,
         isMale: employee.gender === "male",
         isFemale: employee.gender !== "male"
        });
        const blob = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        // Output the document using Data-URI
        saveAs(blob, employee.fullName  + '.docx');
      }
    });
    

  
   // saveAs(blob, 'output2.docx');

  });
  };

  const [open, setOpen] = useState(false);
  const showModal2 = () => {
    setOpen(true);
  };

  const handleCancel2 = () => {
    setOpen(false);
  };
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  
  return (
    <>
    <div>
      <div className="flex justify-end mb-2">
      <Flex gap="small" align="flex-start">

      <Button type="primary" size="large" icon={<FileTextOutlined />} disabled={showAddBtn} 
      onClick={generateContract}>
            <span className="ml-2">Xuất HĐTV</span>
          </Button> 

     
          <Button type="primary" size="large" icon={<PlusOutlined />} disabled={!showAddBtn}>
            <Link href="/tasks/profile/create">
            <span className="ml-2">Thêm</span>

            </Link>
          </Button>

          <Button type="primary" size="large" icon={<ImportOutlined />} onClick={showModal2}
          disabled={!showAddBtn}>
            <span className="ml-2">Thêm nhiều</span>

          </Button>

          <Button type="dashed" size="large" icon={<MinusOutlined />} style={{ padding: '0 20px'}} disabled={showAddBtn} onClick={showModal}>
              <span className="ml-2">Xoá</span>
            </Button>
      </Flex>
  
      </div>
      
      <Employees url={url} 
      loading={loading} 
      selectedRowKeys={selectedRowKeys}
      tableParams={tableParams}
            onSelectChange={onSelectChange}></Employees>
    </div>


    <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
       footer={[
          <Button key="back" onClick={handleCancel}>
            Huỷ
          </Button>,
          <Button
            key="save"
            onClick={handleOk}
          >
            Xoá
          </Button>,
        ]}>
        <p>Bạn có chắc muốn xoá không ?</p>
      </Modal>


      <Modal
        open={open}
        title="Nhận diện hồ sơ"
        onOk={handleOk}
        onCancel={handleCancel2}
        footer={[
          <Button key="back" onClick={handleCancel2}>
            Huỷ
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Nhận diện
          </Button>
        ]}
      >
        <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Kéo và thả tệp vào đây</p>
    <p className="ant-upload-hint">
     Chấp nhận file .xlsx
    </p>
  </Dragger>
      </Modal>
</>

  );
}

export default ProfilePage;

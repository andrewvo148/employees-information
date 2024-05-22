"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Modal, Popover, Table } from "antd";
import type {
  GetProp,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { FileTextOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import moment from "moment";
import * as fs from "fs";
import { IPatch, patchDocument, PatchType, TextRun } from "docx";

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';

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
    title: "Ngày ký HĐ",
    dataIndex: "employeeCode",
    sorter: true,
    width: '200px',
    fixed: "left",
    render: (text, record) => (
      <a href={`/tasks/profile/create/?id=${record.id}`}>{text}</a>
  ),
  },

  {
    title: "Số họp đồng",
    dataIndex: "fullName",
    width: '200px',
    sorter: true,
    fixed: "left"
  },

  {
    title: "Họ và tên NLĐ",
    dataIndex: "gender",
    width: '200px',
    sorter: true
  },

  {
    title: "Vị trí công việc",
    dataIndex: "birthDay",
    width: '200px',
    sorter: true,
  //   render: (text, record) => (
  //     moment({text}).format(dateFormat)
  // ),
  },

  {
    title: "Đơn vị ký hợp đồng",
    dataIndex: "mobilePhone",
    width: '200px',
    sorter: true,
  },

  {
    title: "Loại hợp đồng",
    dataIndex: "officeEmail",
    width: '200px',

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

function ContactPage() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`/api/contracts`)
      .then((res) => res.json())
      .then(({ total, contacts }) => {
        setData(contacts);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: total,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
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
      fetchData();
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
  }
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
            <Link href="/tasks/contract/create">
              <span className="ml-2">Thêm</span>
            </Link>
          </Button>
          <Button type="dashed" size="large" icon={<MinusOutlined />} style={{ padding: '0 20px'}} disabled={showAddBtn} onClick={showModal}>
              <span className="ml-2">Xoá</span>
            </Button>
      </Flex>
  
      </div>
      <div className="h-full" style={{maxHeight: "calc(100vh - 130px)"}}>
        <Table
          rowSelection={rowSelection}
          scroll={{x: "max-content", y: "calc(100vh - 300px)" }}
          columns={columns}
             rowKey={(record) => record.id}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
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
</>

  );
}

export default ContactPage;

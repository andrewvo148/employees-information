"use client";

import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type {
  GetProp,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import moment from "moment";

type TableRowSelection<T> = TableProps<T>["rowSelection"];
const dateFormat = 'DD/MM/YYYY';

interface DataType {
  key: React.Key;
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
    width: '200px',
    fixed: "left",
    render: (text, record) => (
      <a href={`/tasks/profile/create/?id=${record.id}`}>{text}</a>
  ),
  },

  {
    title: "Họ và tên",
    dataIndex: "fullName",
    width: '200px',
    sorter: true,
    fixed: "left"
  },

  {
    title: "Giới tính",
    dataIndex: "gender",
    width: '200px',
    sorter: true,
    render: (text) => (
      text === 'male' ? 'Nam' : 'Nữ'
    )
  },

  {
    title: "Ngày sinh",
    dataIndex: "birthDay",
    width: '200px',
    sorter: true,
    render: (text, record) => (
      moment({text}).format(dateFormat)
  ),
  },

  {
    title: "ĐT di động",
    dataIndex: "mobile",
    width: '200px',

    sorter: true,
  },

  {
    title: "Email cơ quan",
    dataIndex: "officeEmail",
    width: '200px',

  },
  
 

];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

function ProfilePage() {
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
    fetch(`http://localhost:3000/api/employees`)
      .then((res) => res.json())
      .then(({ total, employees }) => {
        setData(employees);
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

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          type="primary"
          className="flex items-center justify-center pl-2 pt-2"
        >
          <Link href="profile/create">
            <PlusOutlined />
            <span className="ml-2">Thêm</span>
          </Link>
        </Button>
      </div>
      <div className="h-full" style={{maxHeight: "calc(100vh - 130px)"}}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          scroll={{x: "max-content", y: "calc(100vh - 300px)" }}
          columns={columns}
          //   rowKey={(record) => record.login.uuid}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default ProfilePage;

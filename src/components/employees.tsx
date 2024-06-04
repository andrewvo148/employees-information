import { SearchOutlined } from "@ant-design/icons";
import {
  GetProp,
  Input,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd";
import moment from "moment";
import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import qs from "qs";
import dayjs from "dayjs";
import { debounce } from "lodash";
import DataTable from "./ui/DataTable";

interface EmployeesProps {
  selectedRowKeys: React.Key[];
  url: string;
  onSelectChange: (key: React.Key[]) => void;
}

type TableRowSelection<T> = TableProps<T>["rowSelection"];
const dateFormat = "DD/MM/YYYY";

interface DataType {
  id: string;
  name: string;
  address: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  query?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Mã nhân viên",
    dataIndex: "employeeCode",
    sorter: true,
    width: "100px",
    fixed: "left",
    render: (text, record) => (
      <a href={`/tasks/profile/create/?id=${record.id}`}>{text}</a>
    ),
  },

  {
    title: "Họ và tên",
    dataIndex: "fullName",
    width: "200px",
    sorter: true,
    fixed: "left",
    render: (text, record) => (
      <a href={`/tasks/profile/create/?id=${record.id}`}>{text}</a>
    ),
  },

  {
    title: "Giới tính",
    dataIndex: "genderName",
    width: "100px",
    sorter: true,
  },

  {
    title: "Ngày sinh",
    dataIndex: "birthDay",
    width: "100px",
    sorter: true,
    render: (text, record) => dayjs(`${record.birthDay}`).format(dateFormat),
  },

  {
    title: "ĐT di động",
    dataIndex: "mobilePhone",
    width: "100px",
    sorter: true,
  },

  {
    title: "Email cơ quan",
    dataIndex: "officeEmail",
    width: "100px",
  },

  {
    title: "Vị trí công việc",
    dataIndex: "jobPositionName",
    width: "200px",
  },
];

const getParams = (params: TableParams) => ({
  ...params,
});

const Employees = ({
  selectedRowKeys,
  onSelectChange,
}: EmployeesProps) => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 15,
    },
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

   
  const handleTableChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
      filters,
      ...sorter,
    });
  };


  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTableParams({
      ...tableParams,
      query: e.target.value,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      }
    });
  };

  const fetchData = () => {
    setLoading(true);
    console.log(getParams(tableParams));
    fetch(`/api/employees?${qs.stringify(getParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ total, employees }) => {
        setData(employees);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: total,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current, tableParams.pagination?.pageSize, tableParams.query,
  ]);



  return (
   <DataTable 
   columns={columns}
   data={data}
   tableParams={tableParams.pagination}
   handleTableChange={handleTableChange}
   onSearchInputChange={onSearchInputChange}
   loading={loading}
   ></DataTable>
  );
};

export default Employees;

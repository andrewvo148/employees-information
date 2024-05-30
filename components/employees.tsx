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

interface EmployeesProps {
  data: DataType[];
  selectedRowKeys: React.Key[];
  loading: boolean;
  startRange: number;
  endRange: number;
  tableParams: TableParams;
  url: string;
  onSelectChange: (key: React.Key[]) => void;
}

type TableRowSelection<T> = TableProps<T>["rowSelection"];
const dateFormat = "DD/MM/YYYY";

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
  query?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Mã nhân viên",
    dataIndex: "employeeCode",
    sorter: true,
    width: "200px",
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
    width: "200px",
    sorter: true,
  },

  {
    title: "Ngày sinh",
    dataIndex: "birthDay",
    width: "200px",
    sorter: true,
    render: (text, record) => dayjs(`${record.birthDay}`).format(dateFormat),
  },

  {
    title: "ĐT di động",
    dataIndex: "mobilePhone",
    width: "200px",
    sorter: true,
  },

  {
    title: "Email cơ quan",
    dataIndex: "officeEmail",
    width: "200px",
  },

  {
    title: "vị trí công việc",
    dataIndex: "jobPositionName",
    width: "200px",
  },
];

const getParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Employees = ({
  startRange,
  endRange,
  selectedRowKeys,
  url,
  onSelectChange,
}: EmployeesProps) => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [params, setParams] = useState(tableParams);
  const [data, setData] = useState<DataType[]>();

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTableParams({
      query: e.target.value,
    });
  };

  const fetchData = (url: string) => {
    setLoading(true);
    fetch(`${url}?${qs.stringify(getParams(tableParams))}`)
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
    fetchData(url);
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams.query,
  ]);

  return (
    <div className="h-full" style={{ maxHeight: "calc(100vh - 130px)" }}>
      <Input
        size="large"
        onChange={onSearchInputChange}
        placeholder="Tìm kiếm"
        prefix={<SearchOutlined />}
        style={{ width: 300 }}
      />
      <Table
        rowSelection={rowSelection}
        scroll={{ x: "max-content", y: "calc(100vh - 300px)" }}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Employees;

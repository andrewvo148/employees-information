'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { GetProp, TableColumnsType, TablePaginationConfig, TableProps } from 'antd';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

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
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
  }
  

const columns: TableColumnsType<DataType> = [
  {
    title: 'Mã nhân viên',
    dataIndex: 'name',
    sorter: true,

  },
  
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    sorter: true,

  },

  {
    title: 'Giới tính',
    dataIndex: 'name',
    sorter: true,

  },


  {
    title: 'Ngày sinh',
    dataIndex: 'name',
    sorter: true,

  },



  {
    title: 'ĐT di động',
    dataIndex: 'name',
    sorter: true,

  },

  {
    title: 'Email cơ quan',
    dataIndex: 'age',
  },
  {
    title: 'Vị trí công việc',
    dataIndex: 'address',
  },
  {
    title: 'Đơn vị công tác',
    dataIndex: 'address',
  },
  {
    title: 'Ngày thử việc',
    dataIndex: 'address',
  },
  {
    title: 'Ngày chính thức',
    dataIndex: 'address',
  },
  {
    title: 'Loại hợp đồng',
    dataIndex: 'address',
  },
  {
    title: 'Trạng thái lao động',
    dataIndex: 'address',
  },

];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

function ProfilePage() {


  //  const [data, setData] = useState<DataType[]>();
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
      //setData([]);
    }
  };
  

  return <Table
  scroll={{ x: "max-content" }}
  columns={columns}
//   rowKey={(record) => record.login.uuid}
  dataSource={data}
  pagination={tableParams.pagination}
  loading={loading}
  onChange={handleTableChange}
/>
};

export default ProfilePage;
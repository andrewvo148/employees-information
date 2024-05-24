import { GetProp, Table, TableColumnsType, TablePaginationConfig, TableProps } from "antd";
import moment from "moment";
import { Engagement } from "next/font/google";
import React from "react";
import { useState } from "react";

interface EmployeesProps {
    data: DataType[];
    selectedRowKeys:  React.Key[];
    loading: boolean;
    startRange: number;
    endRange: number;
    onSelectChange: (key: React.Key[]) => void;
}

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
    dataIndex: "mobilePhone",
    width: '200px',
    sorter: true,
  },

  {
    title: "Email cơ quan",
    dataIndex: "officeEmail",
    width: '200px',

  },
  

];


const Employees = ({data, startRange, endRange, selectedRowKeys, onSelectChange, loading}: EmployeesProps) => {    
   // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    //   setSelectedRowKeys(newSelectedRowKeys);
    //   if (newSelectedRowKeys.length > 0) {
    //    // setShowAddBtn(false);
    //   } else {
    //    // setShowAddBtn(true);
    //   }
      
    // };
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   Table.SELECTION_NONE,
      //   {
      //     key: 'odd',
      //     text: 'Select Odd Row',
      //     onSelect: (changeableRowKeys) => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       setSelectedRowKeys(newSelectedRowKeys);
      //     },
      //   },
      //   {
      //     key: 'even',
      //     text: 'Select Even Row',
      //     onSelect: (changeableRowKeys) => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       setSelectedRowKeys(newSelectedRowKeys);
      //     },
      //   },
      // ],
    };

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

   
    }


      
    return (
        <div className="h-full" style={{maxHeight: "calc(100vh - 130px)"}}>
        <Table
          rowSelection={rowSelection}
          scroll={{x: "max-content", y: "calc(100vh - 300px)" }}
          columns={columns.slice(startRange, endRange)}
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
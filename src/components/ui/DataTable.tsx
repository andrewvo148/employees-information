'use client';

import { ExportOutlined, FilterOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Select, SelectProps, Table, TableColumnsType, TablePaginationConfig, TableProps } from "antd";
import { ChangeEvent, useState } from "react";



const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

interface DataTableProps<DataType> {
    columns: TableColumnsType<DataType>;
    data: DataType[];
    searchKey: string;
    loading: boolean;
    tableParams: TablePaginationConfig;
    handleTableChange: TableProps<DataType>['onChange'];
    onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;

}
function DataTable<DataType, TableParams>({
    columns,
    data, 
    tableParams,
    loading,
    handleTableChange,
    onSearchInputChange,
} : DataTableProps<DataType>) {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };
      
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };


    return (
        <div className="h-full" style={{ maxHeight: "calc(100vh - 130px)" }}>
    
        <Flex>
        <Input
          size="large"
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          onPressEnter={onSearchInputChange}
        />
            <Flex className="ml-auto space-x-2">
                
            <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '300px' }}
                    placeholder="Tất cả đơn vị"
                    onChange={handleChange}
                    options={options}
                />
                <Button icon={<FilterOutlined style={{ color: "#595959" }}/>} size="large">
                </Button>
                <Button icon={<ExportOutlined style={{ color: "#595959" }} />} size="large">
                </Button>
                <Button icon={<SettingOutlined style={{ color: "#595959" }} />} size="large">
                </Button>
            </Flex>
     
        </Flex>
        <Table
          rowSelection={rowSelection}
          scroll={{ x: "max-content", y: "calc(100vh - 300px)" }}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={tableParams}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    );
}


export default DataTable;
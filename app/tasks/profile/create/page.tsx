"use client";

import React, { useEffect, useState } from "react";
import { Modal, Segmented, Table, Tabs } from "antd";
import type { TableColumnsType, TableProps, TabsProps } from "antd";
import { Col, Divider, Row } from "antd";
import moment from 'moment';

import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation'


interface ProvinceType {
  id: string;
  displayName: string;
}

interface DepartmentType {
  id: number;
  name: string;
}

interface EmployeeType {
  id: number;
  employeeCode:          String;  
  contractType:         String;
  employeeStatus:        String;
  firstName:             String;
  lastName:              String;
  fullName:              String;
  // gender                String?
  // hireDate              String?
  // salaryBasic           Int?
  // salarySocialInsurance Int?
  // receiveDate           DateTime?
  // mobile                String?
  // officeEmail           String?
  // birthDay              DateTime?
  // birthPlace String?

  // bankAccountNo String?
  // bankName String?


}
const dateFormat = 'DD/MM/YYYY';
function ProfileCreatePage() {
  const router = useRouter();
 const searchParams = useSearchParams()

  const employeeId = searchParams.get('id');

  const [form] = Form.useForm();
  const [employee, setEmployee] = useState<EmployeeType>(null)
  const [provinces, setProvinces] = useState<ProvinceType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);


  const fetchProvinces = () => {
    fetch("/api/provinces")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProvinces(result.provinces);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  };

  const fetchDepartments = () => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDepartments(result.departments);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  };

  const fetchEmployeeById = () => {
    fetch(`/api/employees/${employeeId}`)
    .then((res) => res.json())
    .then(({employee}) => {
      console.log(employee);
      employee.birthDay = moment(employee.birthDay)
      console.log(employee)
      setEmployee(employee);
     form.setFieldsValue(employee)
    })
    .catch((error) => console.error("Error fetching departments:", error));

  }

  useEffect(() => {
    if (employeeId) {
        fetchEmployeeById();
    }
  }, [employeeId]);


  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    try {
        const body = { ...values };
        await fetch('/api/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        router.push("/tasks/profile")
       // await Router.push('/drafts');
      } catch (error) {
        console.error(error);
        throw error; // Re-throwing the error

      }
  };

    const onCancle =  () => {
      //form.resetFields()
      //onFinish(form.getFieldsValue())
      setIsModalOpen(true);

     
    };

  const firstName = Form.useWatch('firstName', form);
  const lastName = Form.useWatch('lastName', form);
  
  form.setFieldValue('fullName', ((lastName || '') + ' ' + (firstName || '')).trim());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    try {
      onFinish(form.getFieldsValue())
      //setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
     
  };

  const handleBack = () => {
    setIsModalOpen(false);
    router.push("/tasks/profile")
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
       <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
       
       footer={[
          <Button key="back" onClick={handleCancel}>
            Huỷ
          </Button>,
          <Button key="submit" type="primary" onClick={handleBack}>
            Không lưu
          </Button>,
          <Button
            key="save"
            onClick={handleOk}
          >
            Lưu
          </Button>,
        ]}>
        <p>Bạn có muốn lưu lại các thông tin vừa nhập không?</p>
      </Modal>
    <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          labelAlign="left"
          labelWrap={true}
          colon={false}
          style={{}}
          initialValues={employee}
          onFinish={onFinish}
        >
          <Form.Item label="employeeId" name="id" noStyle>
          <Input type="hidden" />
</Form.Item>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Thêm hồ sơ</h2>
        <div className="flex space-x-2">
        <Button className="" onClick={onCancle}
         style={{ padding: '8px 24px', 
        height: "auto"}}>Huỷ
        </Button>
        <Button 
          type="primary" htmlType="submit" style={{ padding: '8px 24px', height: "auto"}}>
          Lưu
        </Button>
        </div>
       
      </div>
      <div
        className="bg-white rounded-md p-6"
        style={{ maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}
      >
        
          <div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Thông tin cơ bản</h2>
            </div>

            <div className="p-5">
              <h4 className="font-bold pb-8">Thông tin chung</h4>
              <Row>
                <Col span={12}>
                  <Form.Item  label="Mã nhân viên" name="employeeCode">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Họ và đệm" name="lastName" rules={[{ required: true, message: '' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Tên" name="firstName" rules={[{ required: true, message: '' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Họ và tên" name="fullName">
                    <Input disabled />
                  </Form.Item>

                  <Form.Item label="Giới tính" name="gender">
                    <Select>
                      <Select.Option value="male">Nam</Select.Option>
                      <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Ngày sinh" name="birthDay">
                    <DatePicker format={dateFormat} />
                  </Form.Item>
                  <Form.Item label="Nơi sinh" name="birthPlace">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Nguyên quán" >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tình trạng hôn nhân">
                    <Select>
                      <Select.Option value="single">Độc thân</Select.Option>
                      <Select.Option value="married">
                        Đã có gia đình
                      </Select.Option>
                      <Select.Option value="divorced">Ly dị</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="MST cá nhân">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Dân tộc">
                    <Select>
                      <Select.Option value="male">Kinh</Select.Option>
                      <Select.Option value="female">Chăm</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Tôn giáo">
                    <Select>
                      <Select.Option value="male">Không</Select.Option>
                      <Select.Option value="female">Hồi giáo</Select.Option>
                      <Select.Option value="female">Phật giáo</Select.Option>
                      <Select.Option value="female">
                        Thiên chúa giáo
                      </Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Quốc tịch">
                    <Select>
                      <Select.Option value="vn">Việt nam</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="p-5">
              <h4 className="font-bold pb-8">CMND/Thẻ căn cước/Hộ chiếu</h4>
              <Row>
                <Col span={12}>
                  <Form.Item label="Loại giấy tờ">
                    <Select>
                      <Select.Option value="cmnd">CMND</Select.Option>
                      <Select.Option value="cccd">CCCD</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Số CMND/CCCD">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Ngày cấp (CMND/CCCD)">
                    <DatePicker format={dateFormat} />
                  </Form.Item>

                  <Form.Item label="Nơi cấp (CMND/CCCD)">
                    <Select>
                      {provinces.map((province) => (
                        <Select.Option value={province.id}>
                          {province.displayName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label=" Ngày hết hạn CMND/CCCD">
                    <DatePicker format={dateFormat}/>
                  </Form.Item>

                  <Form.Item label="Nơi sinh">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Nguyên quán">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="p-5">
              <h4 className="font-bold pb-8">Trình độ/bằng cấp</h4>
              <Row>
                <Col span={12}>
                  <Form.Item label="Trình độ đào tạo">
                    <Select>
                      <Select.Option value="daihoc">Đại học</Select.Option>
                      <Select.Option value="caodang">Cao đẳng</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Nơi đào tạo">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Khoa">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Chuyên ngành">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Năm tốt nghiệp">
                    <InputNumber />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Thông tin liên hệ</h2>
            </div>

            <div className="p-5">
              <h4 className="font-bold pb-8">Số điện thoại/Email/khác</h4>
              <Row>
                <Col span={12}>
                  <Form.Item label="ĐT di động">
                    <Input />
                  </Form.Item>
                  <Form.Item label="ĐT cơ quan">
                    <Input />
                  </Form.Item>
                  <Form.Item label="ĐT nhà riêng">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email cơ quan">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Email cá nhân">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Thông tin công việc
              </h2>
            </div>

            <div className="p-5">
              <h4 className="font-bold pb-8">Thông tin nhân viên</h4>
              <Row>
                <Col span={12}>
                  <Form.Item label="Đơn vị công tác">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Phòng ban">
                    <Select>
                      {departments.map((department) => (
                        <Select.Option value={department.id}>
                          {department.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Trạng thái lao động">
                    <Select>
                      <Select.Option value="cmnd">Đang làm việc</Select.Option>
                      <Select.Option value="cccd">Đã nghỉ việc</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Tính chất lao động">
                    <Select>
                      <Select.Option value="cmnd">Thực tập sinh</Select.Option>
                      <Select.Option value="cccd">Học việc</Select.Option>
                      <Select.Option value="cccd">Thử việc</Select.Option>
                      <Select.Option value="cccd">Chính thức</Select.Option>
                      <Select.Option value="cccd">
                        Tạm đình chỉ công việc
                      </Select.Option>
                      <Select.Option value="cccd">Nghỉ thai sản</Select.Option>
                      <Select.Option value="cccd">
                        Đang làm thủ tục nghỉ việc
                      </Select.Option>
                      <Select.Option value="cccd">Khác</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Loại hợp đồng">
                    <Select>
                      <Select.Option value="cmnd">Thử việc</Select.Option>
                      <Select.Option value="cccd">
                        Hợp đồng xác định thời hạn
                      </Select.Option>
                      <Select.Option value="cccd">
                        Hợp đồng không xác định thời hạn
                      </Select.Option>
                      <Select.Option value="cccd">Học việc</Select.Option>
                      <Select.Option value="cccd">
                        Hợp đồng mùa vụ
                      </Select.Option>
                      <Select.Option value="cccd">
                        Hợp đồng dịch vụ
                      </Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Ngày học việc">
                    <DatePicker />
                  </Form.Item>

                  <Form.Item label="Ngày thử việc">
                    <DatePicker />
                  </Form.Item>

                  <Form.Item label="Ngày chính thức">
                    <DatePicker />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="p-5">
              <h4 className="font-bold pb-8">Thông tin nghỉ việc</h4>
              <Row>
                <Col span={12}>
                  <Form.Item label="Lý do nghỉ việc">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ngày nghỉ việc">
                    <DatePicker />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="p-5">
              <h4 className="font-bold pb-8">Thông tin lương</h4>
              <Row>
                <Col span={12}>
                  <Form.Item label="Lương cơ bản">
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item label="Lương đóng BH">
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item label="Tổng lương">
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tk ngân hàng">
                    <Input />
                  </Form.Item>

                  <Form.Item label="Ngân hàng">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
       
      </div>
      </Form>
    </div>
  );
}

export default ProfileCreatePage;

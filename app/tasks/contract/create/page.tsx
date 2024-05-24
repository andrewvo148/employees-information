"use client";

import React, { use, useEffect, useState } from "react";
import { Avatar, Breadcrumb, Card, Flex, Modal, Segmented, Table, Tabs } from "antd";
import type { TableColumnsType, TableProps, TabsProps } from "antd";
import { Col, Divider, Row } from "antd";
import _ from 'lodash';

import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
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
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Employees from "../../../../components/employees";
import Meta from "antd/es/card/Meta";

const { Option } = Select;

interface ProvinceType {
  id: string;
  displayName: string;
}

interface CountryType {
  id: string;
  displayName: string;
}

interface DistrictType {
  id: string;
  displayName: string;
}

interface DepartmentType {
  id: number;
  name: string;
}

interface laborNatureType {
  id: number;
  name: string;
}

interface jobPositionType {
  id: number;
  name: string;
}

interface ContractTypeType {
  id: number;
  name: string;
}

interface EmployeeType {
  id: number;
  employeeCode: string;
  contractType: string;
  employeeStatus: string;
  firstName: string;
  lastName: string;
  fullName: string;
  jobPostionId: number;
  jobPositionName: string;
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
const dateFormat = "DD/MM/YYYY";
function ProfileCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const employeeId = searchParams.get("id");

  const [form] = Form.useForm();
  const [emp, setEmp] = useState<EmployeeType>();
  const [provinces, setProvinces] = useState<ProvinceType[]>([]);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);

  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [departmentName, setDepartmentName] = useState<string>("");

  const [laborNatures, setLaborNatures] = useState<laborNatureType[]>([]);
  const [laborNatureName, setLaborNatureName] = useState<string>("");

  const [jobPositions, setJobPositions] = useState<jobPositionType[]>([]);
  const [jobPositionName, setJobPositionName] = useState<string>("");

  const [contractTypes, setContractTypes] = useState<ContractTypeType[]>([]);
  const [contractTypeName, setContractTypeName] = useState<string>("");

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const fetchCountries = () => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCountries(result.countries);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  };

  const fetchProvinces = () => {
    fetch("/api/provinces")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProvinces(result.provinces);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  };

  const fetchDistricts = () => {
    fetch("/api/districts")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDistricts(result.districts);
      })
      .catch((error) => console.error("Error fetching districts:", error));
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

  const fetchLaborNatures = () => {
    fetch("/api/laborNatures")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLaborNatures(result.laborNatures);
      })
      .catch((error) => console.error("Error fetching laborNatures:", error));
  };

  const fetchJobPositions = () => {
    fetch("/api/jobPositions")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setJobPositions(result.jobPositions);
      })
      .catch((error) => console.error("Error fetching jobPositions:", error));
  };

  const fetchContractTypes = () => {
    fetch("/api/contractTypes")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setContractTypes(result.contractTypes);
      })
      .catch((error) => console.error("Error fetching contractTypes:", error));
  };

  const fetchEmployeeById = () => {
    fetch(`/api/employees/${employeeId}`)
      .then((res) => res.json())
      .then(({ employee }) => {
        console.log(employee);
        if (employee.birthDay) {
          employee.birthDay = dayjs(employee.birthDay);
        }

        if (employee.identifyNumberIssuedDate) {
          employee.identifyNumberIssuedDate = dayjs(
            employee.identifyNumberIssuedDate
          );
        }

        if (employee.identifyNumberExpiredDate) {
          employee.identifyNumberExpiredDate = dayjs(
            employee.identifyNumberExpiredDate
          );
        }

        if (employee.birthDay) {
          employee.birthDay = dayjs(employee.birthDay);
        }

        if (employee.probationDate) {
          employee.probationDate = dayjs(employee.probationDate);
        }

        if (employee.internalOfficialDate) {
          employee.internalOfficialDate = dayjs(employee.internalOfficialDate);
        }

        if (employee.socialInsuranceOfficialDate) {
          employee.socialInsuranceOfficialDate = dayjs(
            employee.socialInsuranceOfficialDate
          );
        }

        if (employee.healthInsuranceOfficialDate) {
          employee.healthInsuranceOfficialDate = dayjs(
            employee.healthInsuranceOfficialDate
          );
        }

        if (employee.hireDate) {
          employee.hireDate = dayjs(employee.hireDate);
        }

        //console.log(employee)
        //setEmployee(employee);
        form.setFieldsValue(employee);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  };

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeById();
    }
  }, [employeeId]);

  useEffect(() => {
    fetchCountries;
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    fetchDistricts();
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchLaborNatures();
  }, []);

  useEffect(() => {
    fetchJobPositions();
  }, []);

  useEffect(() => {
    fetchContractTypes();
  }, []);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const emp = { ...values };
      emp.jobPositionName = jobPositionName;
      emp.departmentName = departmentName;
      emp.laborNatureName = laborNatureName;
      emp.contractTypeName = contractTypeName;

      await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp),
      });
      router.push("/tasks/profile");
      // await Router.push('/drafts');
    } catch (error) {
      console.error(error);
      throw error; // Re-throwing the error
    }
  };

  const onCancle = () => {
    //form.resetFields()
    //onFinish(form.getFieldsValue())
    setIsModalOpen(true);
  };

  const [step, setStep] = useState(1);
  const onNext = () => {
    //form.resetFields()
    //onFinish(form.getFieldsValue())
    setStep(2);
  };

  const onPrevious = () => {
    //form.resetFields()
    //onFinish(form.getFieldsValue())
    setStep(1);
  };

  const firstName = Form.useWatch("firstName", form);
  const lastName = Form.useWatch("lastName", form);

  form.setFieldValue(
    "fullName",
    ((lastName || "") + " " + (firstName || "")).trim()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    try {
      onFinish(form.getFieldsValue());
      //setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    setIsModalOpen(false);
    router.push("/tasks/profile");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onJobPositionChange = (value: number) => {
    console.log(value);
    let jp = jobPositions.find((jp) => jp.id == value);
    if (jp) {
      setJobPositionName(jp.name);
    }
  };

  const onDepartmentChange = (value: number) => {
    console.log(value);
    let d = departments.find((d) => d.id == value);
    if (d) {
      setDepartmentName(d.name);
    }
  };

  const onLaborNatureChange = (value: number) => {
    console.log(value);
    let laborNature = laborNatures.find(
      (laborNature) => laborNature.id == value
    );
    if (laborNature) {
      setLaborNatureName(laborNature.name);
    }
  };

  const onContractTypeChange = (value: number) => {
    console.log(value);
    let contractType = contractTypes.find(
      (contractType) => contractType.id == value
    );
    if (contractType) {
      setContractTypeName(contractType.name);
    }
  };

  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(`/api/employees`)
      .then((res) => res.json())
      .then(({ total, employees }) => {
        setData(employees);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeType[]>([]);

  const [showAddBtn, setShowAddBtn] = useState(true);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    const filteredEmployees: EmployeeType[] = _.filter(data, (item: EmployeeType) => _.includes(newSelectedRowKeys, item.id));
    setSelectedEmployees(filteredEmployees);

    if (newSelectedRowKeys.length > 0) {
      setShowAddBtn(false);
    } else {
      setShowAddBtn(true);
    }
  };

  const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];


  return (
    <div>
      <Modal
        title="Thông báo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Huỷ
          </Button>,
          <Button key="submit" type="primary" onClick={handleBack}>
            Không lưu
          </Button>,
          <Button key="save" onClick={handleOk}>
            Lưu
          </Button>,
        ]}
      >
        <p>Bạn có muốn lưu lại các thông tin vừa nhập không?</p>
      </Modal>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Thêm hồ sơ</h2>
          <div className="flex space-x-2">
            <Button
              className=""
              onClick={onCancle}
              style={{ padding: "8px 24px", height: "auto" }}
            >
              Huỷ
            </Button>
            {step == 2 && (
              <Button
                className=""
                onClick={onPrevious}
                style={{ padding: "8px 24px", height: "auto" }}
              >
                Quay lại
              </Button>
            )}
            <Button
              type="primary"
              onClick={onNext}
              style={{ padding: "8px 24px", height: "auto" }}
            >
              Tiếp theo
            </Button>
          </div>
        </div>

        <span className={step == 1 ? "text-[#1777ff]" : ""}>
          1. Chọn nhân viên &gt;
        </span>
        <span className={step == 2 ? "text-[#1777ff]" : ""}>
          {" "}
          2. Khai báo thông tin hợp đồng
        </span>

        {step == 1 && (
          <Employees
            data={data}
            loading={loading}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={onSelectChange}
          ></Employees>
        )}
        {step == 2 && (
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            labelAlign="left"
            labelWrap={true}
            colon={false}
            style={{}}
            // initialValues={employee}
            onFinish={onFinish}
          >
            <Form.Item label="employeeId" name="id" noStyle>
              <Input type="hidden" />
            </Form.Item>

            <Flex gap="middle">
              <Card style={{ width: 400 }}>
              <div className="">

              <Input size="large" placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                {selectedEmployees.map((emp) => (
                      <div className="group/item p-3 flex items-center my-2 hover:bg-slate-100 hover:rounded-md">
                        <Avatar size={48} style={{ backgroundColor: colorList[emp.id % colorList.length]}}>{emp.fullName.charAt(0)}</Avatar>
                        <p className="ml-2">{emp.fullName}</p>
                        <DeleteOutlined className="ml-auto invisible group-hover/item:visible" style={{ color: 'red'}} />
                      </div>
                  ))}
              </div>
              </Card>
            <div
              className="bg-white rounded-md p-6"
              style={{ maxHeight: "calc(100vh - 160px)", overflowY: "auto" }}
            >
              <div>
          
                <div className="p-5">
                  <h4 className="font-bold pb-8">Thông tin chung</h4>
                  <Row>
                    <Col span={12}>
                      <Form.Item label="Số hợp đồng" name="contractNo">
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Tên hợp đồng"
                        name="lastName"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Thời hạn hợp đồng"
                        name="firstName"
                        
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item label="Ngày có hiệu lực" name="startDate">
                      <DatePicker  format={dateFormat}/>

                      </Form.Item>

                      <Form.Item label="Ngày hết hạn" name="endDate">
                      <DatePicker  format={dateFormat}/>

                      </Form.Item>

                      {/* <Form.Item label="Giới tính" name="gender">
                        <Select>
                          <Option value="male">Nam</Option>
                          <Option value="female">Nữ</Option>
                        </Select>
                      </Form.Item> */}
                      <Form.Item label="Lương cơ bản" name="salaryBasic">
                        <InputNumber style={{ width: "100%" }}/>
                      </Form.Item>
                      <Form.Item label="Lương đóng bảo hiểm" name="salaryForInsurance">
                        <InputNumber style={{ width: "100%" }}/>
                      </Form.Item>

                           <Form.Item label="Trạng thái ký" name="signStatus">
                        <Select>
                          <Option value="NON">Chưa ký</Option>
                          <Option value="SIGNED">Đã ký</Option>
                        </Select>
                      </Form.Item>
                     
                    </Col>
                    <Col span={12}>
                
                      <Form.Item label="Ngày ký" name="signedDate">
                      <DatePicker  format={dateFormat}/>
                      </Form.Item>
                      <Form.Item label="Loại hợp đồng" name="ethnic">
                        <Input />
                      </Form.Item>

        

                      <Form.Item label="Hình thức làm việc" name="nationality">
                        <Input />
                      </Form.Item>

                      <Form.Item label="Người đại diện công ty ký" name="nationality">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            </Flex>
            
          </Form>
        )}
      </div>
    </div>
  );
}

export default ProfileCreatePage;

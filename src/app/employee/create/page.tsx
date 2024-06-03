"use client";

import React, { useEffect, useState } from "react";
import { Modal, Segmented, Table, Tabs } from "antd";
import type { TableColumnsType, TableProps, TabsProps } from "antd";
import { Col, Divider, Row } from "antd";

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
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

const { Option } = Select;

interface BasicType {
  id: number;
  name: string;
}
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

  const [genders, setGenders] = useState<BasicType[]>([]);
  const [genderName, setGenderName] = useState<string>("");

  
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


  const fetchGenders = () => {
    fetch("/api/genders")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setGenders(result.genders);
      })
      .catch((error) => console.error("Error fetching genders:", error));
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
          employee.socialInsuranceOfficialDate = dayjs(employee.socialInsuranceOfficialDate);
        }



        if (employee.healthInsuranceOfficialDate) {
          employee.healthInsuranceOfficialDate = dayjs(employee.healthInsuranceOfficialDate);
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


  useEffect(() => {
    fetchGenders();
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


  const onGenderChange = (value: number) => {
    console.log(value);
    let g = genders.find((g) => g.id == value);
    if (g) {
      setGenderName(g.name);
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
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        scrollToFirstError
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
            <Button
              htmlType="submit"
              style={{ padding: "8px 24px", height: "auto" }}
            >
              Lưu và thêm
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ padding: "8px 24px", height: "auto" }}
            >
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
                  <Form.Item label="Mã nhân viên" name="employeeCode">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Họ và đệm"
                    name="lastName"
                    rules={[{ required: true, message: "" }]}
          
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Tên"
                    name="firstName"
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Họ và tên" name="fullName">
                    <Input disabled />
                  </Form.Item>


                  <Form.Item label="Giới tính" name="genderId">
                    <Select onChange={onDepartmentChange}>
                      {genders.map((gender) => (
                        <Option value={gender.id}>{gender.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Ngày sinh" name="birthDay">
                    <DatePicker format={dateFormat} style={{ width: '100%'}}/>
                  </Form.Item>
                  <Form.Item label="Tạm trú" name="currentAddress">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Thường trú" name="nativeAddress">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tình trạng hôn nhân" name="maritalStatus">
                    <Select>
                      <Option value="SINGLE">Độc thân</Option>
                      <Option value="MARRIED">Đã có gia đình</Option>
                      <Option value="DIVORCED">Ly dị</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="MST cá nhân" name="pitCode">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Dân tộc" name="ethnic">
                      <Input />
                  </Form.Item>

                  <Form.Item label="Tôn giáo" name="religion">
                    <Select>
                      <Option value="NON">Không</Option>
                      <Option value="ISLAMIC">Hồi giáo</Option>
                      <Option value="BUDDHISM">Phật giáo</Option>
                      <Option value="HOAHAO_BUDDHISM">Phật giáo Hoà Hảo</Option>
                      <Option value="CHRISTIAN">Thiên chúa giáo</Option>
                      <Option value="PROTESTANTISM">Tin lành</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Quốc tịch" name="nationality">
                  <Input defaultValue={'Việt Nam'}/>

                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="p-5">
              <h4 className="font-bold pb-8">CMND/Thẻ căn cước/Hộ chiếu</h4>
              <Row>
                <Col span={12}>
                  <Form.Item label="Loại giấy tờ" name="identificationType">
                    <Select>
                      <Option value="CMND">CMND</Option>
                      <Option value="CCCD">CCCD</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Số CMND/CCCD" name="identifyNumber">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Ngày cấp (CMND/CCCD)"
                    name="identifyNumberIssuedDate"
                  >
                    <DatePicker format={dateFormat} style={{ width: '100%'}}/>
                  </Form.Item>

                  <Form.Item
                    label="Nơi cấp (CMND/CCCD)"
                    name="identifyNumberIssuedPlace"
                  >
                     <Input defaultValue={'Cục cảnh sát QLHC về TTXH'}/>

                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label=" Ngày hết hạn CMND/CCCD"
                    name="identifyNumberExpiredDate"
                  >
                    <DatePicker format={dateFormat} style={{ width: '100%'}}/>
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
                      <Option value="daihoc">Đại học</Option>
                      <Option value="caodang">Cao đẳng</Option>
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
                  <Form.Item label="ĐT di động" name="mobilePhone">
                    <Input />
                  </Form.Item>
                  <Form.Item label="ĐT cơ quan" name="officePhone">
                    <Input />
                  </Form.Item>
                  <Form.Item label="ĐT người thân" name="homePhone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email cơ quan" name="officeEmail">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Email cá nhân" name="otherEmail">
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
                  <Form.Item label="Đơn vị công tác" rules={[{ required: true, message: "" }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Phòng ban" name="departmentId" rules={[{ required: true, message: "" }]}>
                    <Select onChange={onDepartmentChange}>
                      {departments.map((department) => (
                        <Option value={department.id}>{department.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Vị trí công việc" name="jobPositionId">
                    <Select onChange={onJobPositionChange}>
                      {jobPositions.map((jobPosition) => (
                        <Option value={jobPosition.id}>
                          {jobPosition.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Trạng thái lao động" name="employeeStatusName">
                    <Select>
                      <Option value="WORKING">Đang làm việc</Option>
                      <Option value="RESIGNED">Đã nghỉ việc</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Tính chất lao động" name="laborNatureId">
                    <Select onChange={onLaborNatureChange}>
                      {laborNatures.map((laborNature) => (
                        <Option value={laborNature.id}>
                          {laborNature.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Loại hợp đồng" name="contractTypeName">
                  <Input />              
                  </Form.Item>


                  <Form.Item label="Ngày vào làm" name="hireDate">
                    <DatePicker  format={dateFormat} style={{ width: '100%'}}/>
                  </Form.Item>

                  <Form.Item label="Ngày thử việc" name="probationDate">
                    <DatePicker  format={dateFormat} style={{ width: '100%'}}/>
                  </Form.Item>

                  <Form.Item label="Ngày chính thức nội bộ" name="internalOfficialDate">
                    <DatePicker  format={dateFormat} style={{ width: '100%'}}/>
                  </Form.Item>

                  <Form.Item label="Ngày chính thức BHXH" name="socialInsuranceOfficialDate">
                    <DatePicker  format={dateFormat} style={{ width: '100%'}}/>
                  </Form.Item>

                  <Form.Item label="Ngày chính thức BHYT" name="healthInsuranceOfficialDate">
                    <DatePicker  format={dateFormat} style={{ width: '100%'}}/>
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
                    <DatePicker  format={dateFormat} style={{ width: '100%'}}/>
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="p-5">
              <h4 className="font-bold pb-8">Thông tin lương</h4>
              <Row>
                <Col span={12}>

                  <Form.Item label="Lương thử việc" name="salaryProbationary">
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item label="Lương hiệu quả cv" name="salaryProductivity">
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item label="Lương đóng BH" name="salarySocialInsurance">
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item label="Tổng lương" name="salaryTotal">
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="TK ngân hàng" name="bankAccountNo">
                    <Input />
                  </Form.Item>

                  <Form.Item label="Ngân hàng" name="bankName">
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

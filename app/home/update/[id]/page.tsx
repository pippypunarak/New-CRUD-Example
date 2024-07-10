"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { initialData } from "../../page";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Form,
  Input,
  Select,
  Switch,
  Button,
  Col,
  Row,
  Layout,
  Menu,
  theme,
} from "antd";

const { Header, Content, Sider } = Layout;

type DataType = {
  key: string;
  code: string;
  nameTh: string;
  nameEn: string;
  shortName: string;
  continent: string;
  status: boolean;
};

type FormData = {
  รหัสประเทศ?: string | undefined;
  "ชื่อประเทศ (ภาษาไทย)": string;
  "ชื่อประเทศ (ภาษาอังกฤษ)": string;
  "ตัวย่อชื่อประเทศ (ภาษาอังกฤษ)": string;
  ทวีป?: string | undefined;
  สถานะการใช้งาน: boolean;
};

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const UpdatePage: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState<DataType | undefined>(undefined);

  useEffect(() => {
    if (typeof id === "string") {
      const data = initialData.find((item) => item.key === id);
      if (data) {
        setFormData(data);
      }
    }
  }, [id]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const onSubmit = (values: FormData) => {
    console.log("ข้อมูลประเทศ :", values);
  };

  return (
    <>
      <Layout className="min-h-screen">
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          breakpoint="md"
          collapsedWidth="0"
        >
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout className="bg-gray-200">
          <Header className="p-0 bg-gray-100 ">
            <div className="text-2xl pt-4 pl-10">แก้ไขข้อมูลประเทศ</div>
          </Header>
          <Content className="m-6">
            <div className="p-6 min-h-[360px] bg-white rounded-lg">
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form
                    name="updateForm"
                    style={{ maxWidth: 600 }}
                    layout="vertical"
                    onFinish={onSubmit}
                    initialValues={{
                      รหัสประเทศ: formData.code,
                      "ชื่อประเทศ (ภาษาไทย)": formData.nameTh,
                      "ชื่อประเทศ (ภาษาอังกฤษ)": formData.nameEn,
                      "ตัวย่อชื่อประเทศ (ภาษาอังกฤษ)": formData.shortName,
                      ทวีป: formData.continent,
                      สถานะการใช้งาน: formData.status,
                    }}
                  >
                    <Form.Item
                      hasFeedback
                      label="รหัสประเทศ"
                      name="รหัสประเทศ"
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          pattern: /^[0-9]+$/,
                          message: "กรุณาป้อนตัวเลขเท่านั้น",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      label="ชื่อประเทศ (ภาษาไทย)"
                      name="ชื่อประเทศ (ภาษาไทย)"
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          pattern: /^[ก-๙เ\s]+$/,
                          message: "กรุณาป้อนภาษาไทยเท่านั้น",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      label="ชื่อประเทศ (ภาษาอังกฤษ)"
                      name="ชื่อประเทศ (ภาษาอังกฤษ)"
                      rules={[
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: "กรุณาป้อนภาษาอังกฤษเท่านั้น",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      label="ตัวย่อชื่อประเทศ (ภาษาอังกฤษ)"
                      name="ตัวย่อชื่อประเทศ (ภาษาอังกฤษ)"
                      rules={[
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: "กรุณาป้อนภาษาอังกฤษเท่านั้น",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item label="ทวีป" name="ทวีป">
                      <Select>
                        <Select.Option value="ทวีปเอเชีย">
                          ทวีปเอเชีย
                        </Select.Option>
                        <Select.Option value="ทวีปยุโรป">
                          ทวีปยุโรป
                        </Select.Option>
                        <Select.Option value="ทวีปอเมริกา">
                          ทวีปอเมริกา
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="สถานะการใช้งาน"
                      name="สถานะการใช้งาน"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>

                    <Form.Item>
                      <Row className="place-items-start" gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8} lg={6}>
                          <Button type="primary" htmlType="submit" block>
                            บันทึก
                          </Button>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                          <Button
                            onClick={() => {
                              router.push("/home");
                            }}
                            block
                          >
                            ย้อนกลับ
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default UpdatePage;

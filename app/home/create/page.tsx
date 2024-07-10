"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  Space,
} from "antd";

const { Header, Content, Sider } = Layout;
type FormData = {
  รหัสประเทศ: string | undefined;
  "ชื่อประเทศ (ภาษาไทย)": string;
  "ชื่อประเทศ (ภาษาอังกฤษ)": string;
  "ตัวย่อชื่อประเทศ (ภาษาอังกฤษ)": string;
  ทวีป: string | undefined;
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

const Page: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [formData, setFormData] = useState<FormData>({
    รหัสประเทศ: undefined,
    "ชื่อประเทศ (ภาษาไทย)": "",
    "ชื่อประเทศ (ภาษาอังกฤษ)": "",
    "ตัวย่อชื่อประเทศ (ภาษาอังกฤษ)": "",
    ทวีป: undefined,
    สถานะการใช้งาน: false,
  });
  const router = useRouter();
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
            <div className="text-2xl pt-4 pl-10">เพิ่มข้อมูลประเทศ</div>
          </Header>
          <Content className="m-6">
            <div className="p-6 min-h-[360px] bg-white rounded-lg">
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form
                    name="trigger"
                    style={{ maxWidth: 600 }}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onSubmit}
                    initialValues={formData}
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
                      <Input placeholder="รหัสประเทศ" />
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
                      <Input placeholder="ชื่อประเทศ (ภาษาไทย)" />
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
                      <Input placeholder="ชื่อประเทศ (ภาษาอังกฤษ)" />
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
                      <Input placeholder="ตัวย่อชื่อประเทศ (ภาษาอังกฤษ)" />
                    </Form.Item>

                    <Form.Item label="ทวีป" name="ทวีป">
                      <Select
                        onChange={(value) =>
                          setFormData({ ...formData, ทวีป: value })
                        }
                        placeholder="ทวีป"
                      >
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
                      <Switch
                        onChange={(checked) =>
                          setFormData({ ...formData, สถานะการใช้งาน: checked })
                        }
                      />
                    </Form.Item>

                    <Form.Item>
                      <Row className="place-items-start" gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8} lg={6}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            block
                            onClick={() => {
                              router.push("/home");
                            }}
                          >
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

export default Page;

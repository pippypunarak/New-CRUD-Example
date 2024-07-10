"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Table, Button, Space, Row, Col } from "antd";
import type { TableColumnsType } from "antd";
import {
  EditOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import type { SearchProps } from "antd/es/input";

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

interface DataType {
  key: string;
  code: string;
  nameTh: string;
  nameEn: string;
  shortName: string;
  continent: string;
  status: boolean;
}

export const initialData: DataType[] = [
  {
    key: "1",
    code: "123",
    nameTh: "อัฟกานิสถาน",
    nameEn: "Afghanistan",
    shortName: "AFG",
    continent: "เอเชีย",
    status: true,
  },
  {
    key: "2",
    code: "456",
    nameTh: "อัลบาเนีย",
    nameEn: "Albania",
    shortName: "ALB",
    continent: "เอเชีย",
    status: true,
  },
  {
    key: "3",
    code: "789",
    nameTh: "แอลจีเนีย",
    nameEn: "Algeria",
    shortName: "DZA",
    continent: "เอเชีย",
    status: true,
  },
  {
    key: "4",
    code: "889",
    nameTh: "อเมริกัน ซามัว",
    nameEn: "American Samoa",
    shortName: "ASM",
    continent: "ยุโรป",
    status: true,
  },
  {
    key: "5",
    code: "457",
    nameTh: "แอนโดรา",
    nameEn: "Andorra",
    shortName: "AND",
    continent: "ยุโรป",
    status: true,
  },
  {
    key: "6",
    code: "498",
    nameTh: "แองโกลา",
    nameEn: "Angola",
    shortName: "AGO",
    continent: "ยุโรป",
    status: true,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const Home = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [dataSource, setDataSource] = useState<DataType[]>(initialData);
  const [showDetailedSearch, setShowDetailedSearch] = useState<boolean>(false);

  const handleEdit = (key: string) => {
    router.push(`/home/update/${key}`);
  };

  const handleAdd = () => {
    router.push("/home/create");
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = dataSource.filter(
    (item) =>
      item.nameTh.includes(searchText) || item.nameEn.includes(searchText)
  );
  const columns: TableColumnsType<DataType> = [
    {
      title: "ลำดับที่",
      dataIndex: "key",
    },
    {
      title: "รหัสประเทศ",
      dataIndex: "code",
    },
    {
      title: "ชื่อประเทศภาษาไทย",
      dataIndex: "nameTh",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "ชื่อประเทศภาษาอังกฤษ",
      dataIndex: "nameEn",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "ตัวย่อชื่อประเทศภาษาอังกฤษ",
      dataIndex: "shortName",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "ทวีป",
      dataIndex: "continent",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      align: "center",
      render: (status: boolean) => (
        <div>
          {status ? (
            <CheckCircleFilled style={{ color: "#1A5319", fontSize: "20px" }} />
          ) : (
            <CloseCircleFilled style={{ color: "#FF4D4F", fontSize: "20px" }} />
          )}
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      align: "center",
      render: (text: string, record: DataType) => (
        <Button
          type="link"
          onClick={() => handleEdit(record.key as string)}
          icon={<EditOutlined />}
          style={{ backgroundColor: "#1E2E97", color: "white" }}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <Row className="mb-4" gutter={[16, 16]} justify="space-between">
        <Col>
          <Button onClick={handleAdd} type="primary">
            สร้างใหม่
          </Button>
        </Col>
        {!showDetailedSearch && (
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Space direction="vertical" className="w-full">
              <Search
                placeholder="ชื่อประเทศ"
                onSearch={onSearch}
                onChange={handleSearch}
                enterButton
              />
            </Space>
          </Col>
        )}
      </Row>
      <Row className="mb-4" justify="end">
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div
            onClick={() => setShowDetailedSearch(!showDetailedSearch)}
            className="text-right w-full"
          >
            {showDetailedSearch ? "ซ่อน" : "ค้นหาอย่างละเอียด >>"}
          </div>
        </Col>
      </Row>
      {showDetailedSearch && (
        <Row className="mb-4" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6} lg={5}>
            <div>ชื่อประเทศภาษาไทย</div>
            <Input
              type="text"
              placeholder="ค้นหาจาก ชื่อประเทศภาษาไทย"
              className="p-1 border-1 rounded-md"
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={5}>
            <div>ชื่อประเทศภาษาอังกฤษ</div>
            <Input
              type="text"
              placeholder="ค้นหาจาก ชื่อประเทศภาษาอังกฤษ"
              className="p-1 border-1 rounded-md"
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={5}>
            <div>ตัวย่อชื่อประเทศภาษาอังกฤษ</div>
            <Input
              type="text"
              placeholder="ค้นหาจาก ตัวย่อชื่อประเทศภาษาอังกฤษ"
              className="p-1 border-1 rounded-md"
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={5}>
            <div>สถานะ</div>
            <select className="p-1 rounded-md border-2 border-solid border-gray-200 w-full">
              <option>ทั้งหมด</option>
            </select>
          </Col>
          <Col xs={24} sm={24} md={6} lg={4} className="flex items-end">
            <button className="bg-blue-500 text-white p-1 px-5 rounded-md">
              ค้นหา
            </button>
          </Col>
        </Row>
      )}
      <Space className="mt-8 mb-5">
        <Button className="bg-zinc-600 text-white">Copy</Button>
        <Button className="bg-zinc-600 text-white">CSV</Button>
        <Button className="bg-zinc-600 text-white">Excel</Button>
      </Space>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={filteredData}
      />
    </div>
  );
};

export default Home;

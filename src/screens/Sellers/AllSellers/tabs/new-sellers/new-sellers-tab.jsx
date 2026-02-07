import { Table, Popover, Space, Avatar } from "antd";
import Button from "@/components/lib/Button";
import React, { useMemo } from "react";

export default function NewSellersTab() {
  const content = useMemo(() => (
    <div className="popover__custom">
      <Button
        height="30px"
        radius="5px"
        hoverBg="#F5F5F5"
        hoverColor="black"
        onClick={() => {
          window.location = "/seller/ss";
        }}
      >
        View Seller Details
      </Button>
      <Button
        height="30px"
        radius="5px"
        hoverBg="#F5F5F5"
        color="var(--oosriPrimary)"
        hoverColor="var(--oosriPrimary)"
        width="100%"
      >
        Unverify Seller
      </Button>
    </div>
  ), []);

  const sellersDataColumns = useMemo(() => [
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
      render: (text, record) => (
        <Space>
          <Avatar size={45} src={record.profilePicture || "/default-profile.jpg"} />
          <p>{text}</p>
        </Space>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Space size="middle">
          <p className={status?.toLowerCase() === "verified" ? "verified__text" : ""}>
            {status}
          </p>
        </Space>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Popover content={content} trigger="click">
          <span style={{ cursor: "pointer" }}>•••</span>
        </Popover>
      ),
    },
  ], [content]);

  const sellersTableData = [
    {
      key: "1",
      sellerName: "Henry Collins",
      emailAddress: "henrycollins@gmail.com",
      country: "Australia",
      phoneNumber: "Phone Number",
      registrationDate: "2023-10-02 9:30:00",
      status: "Verified",
    },
    {
      key: "2",
      sellerName: "Henry Collins",
      emailAddress: "henrycollins@gmail.com",
      country: "Australia",
      phoneNumber: "Phone Number",
      registrationDate: "2023-10-02 9:30:00",
      status: "Verified",
    },
    {
      key: "3",
      sellerName: "Henry Collins",
      emailAddress: "henrycollins@gmail.com",
      country: "Australia",
      phoneNumber: "Phone Number",
      registrationDate: "2023-10-02 9:30:00",
      status: "Verified",
    },
    {
      key: "4",
      sellerName: "Henry Collins",
      emailAddress: "henrycollins@gmail.com",
      country: "Australia",
      phoneNumber: "Phone Number",
      registrationDate: "2023-10-02 9:30:00",
      status: "Verified",
    },
  ];

  return (
    <Table
      columns={sellersDataColumns}
      dataSource={sellersTableData}
      className="table__class"
    />
  );
}

import Picture from "@/assets/images/profile.jpg";
import { HiOutlineEllipsisHorizontal as EllipsisIcon } from "react-icons/hi2";
import { Table, Popover, Space, Avatar } from "antd";
import Button from "@/components/lib/Button";

export default function NewSellersTab() {
  //incase you unverify a seller later, should still be in all-sellers
  const content = (
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
  );

  const sellersDataColumns = [
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
      render: (_) => (
        <Space>
          {/* item image */}
          <Avatar size={45} src={Picture.src} />
          <Space direction="vertical" size={1}>
            <p>{_}</p>
          </Space>
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
      render: (_, obj) => (
        <Space size="middle">
          {_?.toLowerCase() === "verified" ? (
            <p className="verified__text">{_}</p>
          ) : (
            <p>{_}</p>
          )}
        </Space>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Popover content={content} trigger="click">
          <EllipsisIcon style={{ cursor: "pointer" }} />
        </Popover>
      ),
    },
  ];

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

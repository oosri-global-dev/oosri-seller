import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { GoStack as StackIcon } from "react-icons/go";
import { IoBagOutline as BagIcon } from "react-icons/io5";
import { CiCreditCard1 as CardIcon } from "react-icons/ci";
import { HiOutlineUsers as UserIcon } from "react-icons/hi2";
import { HiOutlineShoppingBag as ProductIcon } from "react-icons/hi2";
import { MdPayments as PaymentIcon } from "react-icons/md";
import { VscGraph as GraphIcon } from "react-icons/vsc";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { Avatar, Dropdown, Menu, Space, Tag } from "antd";
import Picture from "@/assets/images/profile.jpg";

export const dashboardTableColumns = [
  {
    title: "OrderId",
    dataIndex: "orderId",
    key: "orderId",
    render: (_) => (
      <Space>
        {/* item image */}
        <Avatar size={45} src={Picture.src} />
        <Space direction="vertical" size={1}>
          <p>{_}</p>
          <p className="item__number">2 item</p>
        </Space>
      </Space>
    ),
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "orderDate",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (_) => (
      <Space>
        <Avatar size={28} src={Picture.src} />
        <p>{_}</p>
      </Space>
    ),
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (_, obj) => (
      <Space size="middle">
        {_?.toLowerCase() === "sent for pickup" && (
          <p className="sent__pickup">{_}</p>
        )}
        {_?.toLowerCase() === "delivered" && (
          <p className="delivered__pickup">{_}</p>
        )}
      </Space>
    ),
  },
];


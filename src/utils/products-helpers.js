import { Space, Avatar } from "antd";
import Picture from "@/assets/images/profile.jpg";
import { Popover, Switch } from "antd";
import { HiOutlineEllipsisHorizontal as EllipsisIcon } from "react-icons/hi2";
import Button from "@/components/lib/Button";

const content = (
  <div className="popover__custom">
    <Button
      height="30px"
      radius="5px"
      onClick={() => (window.location = "/product/sss")}
    >
      View More Details
    </Button>
    <Button height="30px" radius="5px">
      Unpublish Details
    </Button>
  </div>
);

export const productsTableColumns = [
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
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Product ID",
    dataIndex: "productId",
    key: "productId",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (_) => (
      <Space>
        <p>{_}</p>
      </Space>
    ),
  },
  {
    title: "In stock",
    dataIndex: "instock",
    key: "instock",
  },
  {
    title: "Visibility",
    dataIndex: "visibility",
    key: "visibility",
    render: () => (
      <div>
        <Switch defaultChecked onChange={() => {}} />
      </div>
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

export const productsTableData = [
  {
    key: "orderId",
    sellerName: "Henry Collins",
    productName: "Nokia A23",
    productId: "P12345",
    price: "$100",
    country: "Nigeria",
    instock: "50",
  },
  {
    key: "orderId",
    sellerName: "Henry Collins",
    productName: "Nokia A23",
    productId: "P12345",
    price: "$100",
    country: "Nigeria",
    instock: "50",
  },
  {
    key: "orderId",
    sellerName: "Henry Collins",
    productName: "Nokia A23",
    productId: "P12345",
    price: "$100",
    country: "Nigeria",
    instock: "50",
  },
  {
    key: "orderId",
    sellerName: "Henry Collins",
    productName: "Nokia A23",
    productId: "P12345",
    price: "$100",
    country: "Nigeria",
    instock: "50",
  },
];

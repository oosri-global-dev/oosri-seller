import { Space, Avatar } from "antd";
import { Popover, Switch } from "antd";
import { HiOutlineEllipsisHorizontal as EllipsisIcon } from "react-icons/hi2";
import Button from "@/components/lib/Button";
import { deleteProduct } from "@/network/product";

  const handleDelete= async (param)=>{
    try{
      const data= deleteProduct(param)
      console.log(data)
      window.location.hash="deleted"
    }catch(errors){
      window.location.hash="delete"
      console.log(errors)
    }
}
const content = (obj) => (
  <div className="popover__custom">
    <Button
      height="30px"
      radius="5px"
      onClick={() => { console.log(obj); window.location= `product/${obj._id}`}} // Logging obj here
    >
      View More Details
    </Button>
    <Popover trigger={"click"} >
      <Button height="30px" radius="5px"
      onClick={() => {handleDelete(obj._id)}}
      >
        Unpublish Details
      </Button>
    </Popover>
  </div>
)

export const productsTableColumns = [
  {
    title: "Seller Name",
    dataIndex: "brandArtist",
    key: "brandArtist",
    render: (_,obj) => (
      <Space>
        {/* item image */}
        <Avatar size={45} src={obj.images[0]} />
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
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Price",
    dataIndex: "regularPrice",
    key: "regularPrice",
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
    dataIndex: "isApproved",
    key: "isApproved",
    render: () => (
      <div>
        <Switch defaultChecked disabled />
      </div>
    ),
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (_,obj) => (
     <Popover content={content(obj)} trigger="click">
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

import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { AllProductsWrapper, TopMenuWrapper } from "./all-products.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Table,Space, Avatar,Popover, Switch } from "antd";
import Button from "@/components/lib/Button";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import TextField from "@/components/lib/TextField";
import { LuArrowUpDown as FilterArrow } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";
import { isBusinessActive } from "@/utils/business-checker";
import { NO_BUSINESS_MODAL } from "@/context/types";
import { deleteProduct, filterAllProducts, getAllProducts } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { HiOutlineEllipsisHorizontal as EllipsisIcon } from "react-icons/hi2";


export default function AllProductsScreen() {
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(false);
  const [allProducts,setAllProducts]=useState([])
  const [openModal,setOpenModal]=useState(false)
  const [modalError,setModalError]=useState(false)
  const [editModal,setEditModal]=useState(true)
  const [tableLoading,setTableLoading]=useState(false)
  const [deleteId,setDeleteId]=useState("")
  const [visibility,setVisibility]=useState("")
  const { push } = useRouter();
  const {
    dispatch,
    state: { user },
  } = useMainContext();

  const items = [
    {
      key: "1",
      label: "Products",
    },
    {
      key: "2",
      label: "Pending Products",
    },
  ];

  const handleDelete= async (param)=>{
    try{
      const data = await deleteProduct(param)
      setModalError(false)
      setEditModal(false)
    }catch(errors){
      console.log(errors)
      setModalError(true)
    }
}

  const openDeleteModal=(params)=>{
    setOpenModal(true)
    setDeleteId(params)
  } 
  
  const content = (obj) => (
    <div className="popover__custom">
      <Button
        height="30px"
        radius="5px"
        onClick={() => {window.location= `product/${obj._id}`}}
      >
        View More Details
      </Button>
        <Button height="30px" radius="5px" onClick={() => {openDeleteModal(obj)}}
        >
          Unpublish Details
        </Button>
    </div>
  )
  
  const productsTableColumns = [
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
      render: (_,obj) => (
        <Space>
          {/* item image */}
          {/* <Avatar size={45} src={obj?.images[0]} /> */}
          <Avatar size={45} src={"https://placehold.co/600x400"} />
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
      dataIndex: "inStock",
      key: "inStock",
    },
    {
      title: "Visibility",
      dataIndex: "isApproved",
      key: "isApproved",
      render: () => (
        <div>
          <Switch defaultChecked onChange={(e)=>{console.log(e)}} />
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
  

  const fetchAllProducts = async () => {
    setTableLoading(true);
    try {
      const data = await getAllProducts();
      setAllProducts(data.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const closeModal=async()=>{
    setTableLoading(true)
    try{
      await fetchAllProducts()
    }catch(errors){
      console.log(errors)
    }finally{
      setEditModal(true)
      setTableLoading(false)
      setOpenModal(false)
      setModalError(false)
    }
  }

  const filterProducts=async(e)=>{
    const filterParams=`productName=${e}&sortBy=newest`
    setTableLoading(true)
    const payload={
      pageNo: 1,
      pageSize: 1
    }
    try{
      const data=await filterAllProducts(filterParams)
      setAllProducts(data.data.data);
      setTableLoading(false)
    }catch(errors){
      console.log(errors)
    }
  }



  return (
      <DashboardLayout title={"Products"}>
        <FlexibleDiv
          width="100%"
          justifyContent="flex-end"
          margin="0px 0px 20px 0"
        >
          <Button
            backgroundColor="var(--oosriPrimary)"
            color="#fff"
            onClick={() => {
              if (isBusinessActive(user)) {
                push("/product/create");
              } else {
                dispatch({
                  type: NO_BUSINESS_MODAL,
                  payload: true,
                });
              }
            }}
          >
            + Add New Product
          </Button>
        </FlexibleDiv>

        {/* <TopMenuWrapper>
          <Tabs
            className="tabs__custom"
            defaultActiveKey="1"
            items={items}
            onChange={(e) =>
              e === 1 ? setActiveTab("products") : setActiveTab("pendingProducts")
            }
          />
        </TopMenuWrapper> */}
        <AllProductsWrapper>
          <FlexibleDiv
            flexDir="column"
            alignItems="space-between"
            className="products__table__section"
          >
            <FlexibleDiv
              flexDir="row"
              justifyContent="space-between"
              flexWrap="nowrap"
              className="search__body__section"
            >
              <FlexibleDiv
                className="search__section"
                flexDir="row"
                flexWrap="nowrap"
              >
                <SearchIcon size={18} className="search__icon" />
                <TextField
                  id="search"
                  className="text__field__custom"
                  placeholder="Search by products name"
                  autoComplete="new-password"
                  type="text"
                  onChange={(e)=>{filterProducts(e.target.value)}}
                />
              </FlexibleDiv>
              <Button
                border="1px solid #E0E0E0"
                height="38px"
                className="filter__btn__custom"
                hoverBg="transparent"
                radius="8px"
                hoverBorderColor="var(--oosriPrimary) !important"
                hoverColor="var(--oosriBlack)"
              >
                <FilterArrow size={16} color="black" />
                Filter
              </Button>
            </FlexibleDiv>

            <FlexibleDiv className="products__table__wrapper">
                <Table
                  columns={productsTableColumns}
                  dataSource={allProducts}
                  className="table__class"
                  loading={tableLoading}
                  
                />
            </FlexibleDiv>
          </FlexibleDiv>

        <StyledModal maskClosable={true} open={openModal} centered closeIcon={null} className="modal" footer={null} >
          {
            editModal?
            <>
              <h2 style={{textAlign:"center"}}>Delete Product</h2>
              <p style={{textAlign:"center",margin:"16px 0px", color:"#777777"}}>Are you sure you want to delete this product {deleteId.productName}?</p>
              <FlexibleDiv flexWrap="nowrap" gap="24px">
                <Button border="1px solid #FC5353" color="#FC5353" hoverBg="white" hoverColor="var(--oosriPrimary)" width="100%" onClick={()=>{setOpenModal(false)}}>No</Button>
                <Button onClick={() => handleDelete(deleteId?._id)} border="1px solid #FC5353" color="white" backgroundColor="var(--oosriPrimary)" width="100%">Yes</Button>

              </FlexibleDiv>
            </>
            :modalError?
              <>
                <h2 style={{textAlign:"center"}}>Product Update Failed</h2>
                <p style={{textAlign:"center",margin:"16px 0px", color:"#777777"}}>We ran into a problem while trying to delete this product please try again</p>
                <Button onClick={closeModal} border="1px solid #FC5353" color="white" backgroundColor="var(--oosriPrimary)" width="100%">Close</Button>
              </>:
              <>
                <h2 style={{textAlign:"center"}}>Product Deleted Succesfully</h2>
                <p style={{textAlign:"center",margin:"16px 0px", color:"#777777"}}>Your Produt has been deleted Successfully</p>
                <Button onClick={closeModal} border="1px solid #FC5353" color="white" backgroundColor="var(--oosriPrimary)" width="100%">Close</Button>
              </>
            }
        </StyledModal>
        </AllProductsWrapper>
      </DashboardLayout>
  )
}
 
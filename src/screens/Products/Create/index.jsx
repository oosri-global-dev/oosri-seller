import { CreateProductPageWrapper } from "./index.styles";
import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import ProductImage from "@/assets/images/profile.jpg";
import Button from "@/components/lib/Button";
import HeaderTextAndSub from "../Product/simple-components/simple-components";
import { useEffect, useState } from "react";
import { Input, Modal, Tabs } from "antd";
import Select from "@/components/lib/Select";
import { CustomUpload } from "@/components/lib/CustomUpload";
import TextArea from "antd/es/input/TextArea";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { MobileTab } from "./Tabs/mobile";
import { TabletTab } from "./Tabs/tablet";
import { WatchesTab } from "./Tabs/watches";
import { createProduct, getCategories } from "@/network/product";

export default function CreateProductPage(){
  const [activeTab,setActiveTab]=useState("mobile")
  const [openModal,setOpenModal]=useState(false)
  const [img1,setImg1]=useState()
  const [img2,setImg2]=useState()
  const [img3,setImg3]=useState()
  const [img4,setImg4]=useState()
  const[categories,setCategories]=useState([
    // {id:1,name:'textile',subCategories:[]}
  ]) 
  useEffect(()=>{
    const fetchAllProducts= async()=>{
      try{
        const data= await getCategories()
        const newCategories = categories;

        for (let index = 0; index < data.data.data.length; index++) {
          newCategories.push(data.data.data[index]);     
        }
        setCategories(newCategories);
      }catch(errors){
        console.log(errors)
      }
    }
    fetchAllProducts()
  },[])

  const items = [
    {
      key: "1",
      label: "Mobile Phone",
    },
    {
      key: "2",
      label: "Wristwatch",
    },
    {
      key: "3",
      label: "Tablet",
    },
    {
      key: "4",
      label: "Computer Accessories",
    },
  ];

  const colorOptions=[
    { value: 'red', label: 'Red' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ]

  const handleModalOpen=()=>{
    setOpenModal(true)
  }

  const handleCreateProduct=async ()=>{
    try{
      const response=await createProduct()
      console.log(response)
      handleModalOpen()
    }catch(errors){
      console.log(errors)
    }
  }

  return (
    <DashboardLayout title={"Add Product"} showBackBtn>
      <CreateProductPageWrapper>
        <Tabs
        className="tabs__custom"
        defaultActiveKey="1"
        items={items}
        onChange={(e) => {
            if (e === "1") setActiveTab("mobile");
            else if (e === "2") setActiveTab("watches");
            else if(e === "3")setActiveTab("tablet");
            else if(e==="4")setActiveTab("accesories")
        }} />
        {activeTab === "mobile"?
         <MobileTab />:
        activeTab=="watches"?
        <WatchesTab />:
        activeTab=="tablet"?
        <TabletTab />:
        activeTab==="accesories"&&
        <FlexibleDiv className="container_wrapper" alignItems="start">
        {/* Left section */}
      <FlexibleDiv className="50%" flexDir="column" alignItems="start" gap="24px">
        <FlexibleDiv justifyContent="start">
          {/* Name */}
          <div className="product__item">
            <label htmlFor="Name">Product Name</label>
            <HeaderTextAndSub title={<Input placeholder="Input product name" />} content={<p>Do not exceed 40 characters while entering name</p>} />
          </div>
          {/* Color */}
          <div>
            <label htmlFor="Color">Color</label>
            <Select options={colorOptions} placeholder="Select color"/>
          </div>
        </FlexibleDiv>
        {/* Category */}
        <div className="product__item">
            <label htmlFor="Name">Product Category</label>
            <Input placeholder="Mobile Phone" />
        </div>
        {/* Country */}
        <div className="product__item">
            <label htmlFor="Name">Country</label>
            <Input placeholder="Input country" />
        </div>
        {/* Brand */}
        <div className="product__item">
            <label htmlFor="Name">Brand - Model - Type</label>
            <Select options={colorOptions} placeholder="Select product brand"/>
        </div>
        {/* Condition */}
        <div className="product__item">
            <label htmlFor="Name">Condition</label>
            <Select options={colorOptions} placeholder="Select product brand"/>
        </div>
        {/* Sub-Condition */}
        <div className="product__item">
            <label htmlFor="Name">Sub Condition</label>
          <Input placeholder="e.g: Cracked Body only, Cracked Camera...." />
        </div>
        {/* Quantity Available*/}
        <div className="product__item">
            <label htmlFor="Name">Quantity Available (Stock)</label>
            <Input placeholder="Input quantity available"/>
        </div>
      </FlexibleDiv>
      {/* right section */}
      <FlexibleDiv flexDir="column" gap="24px" alignItems="start" width="100%">
        <FlexibleDiv className="img__upload" justifyContent="start">
          <CustomUpload editable setFile={setImg1} />
          <CustomUpload editable setFile={setImg1} />
          <FlexibleDiv flexDir="column" className="column_item" width="fit-content">
            <CustomUpload editable setFile={setImg1} />
            <CustomUpload editable setFile={setImg1} />
          </FlexibleDiv>
        </FlexibleDiv>
        {/* Price */}
        <div className="product__item">
            <label htmlFor="Name">Price</label>
            <Input placeholder="Input product price"/>
        </div>
        {/* Band Material */}
        <div className="product__item">
            <label htmlFor="Name">Band Material</label>
            <Input placeholder="Input band material"/>
        </div>
        {/* Dsicounts*/}
        <div className="product__item">
            <label htmlFor="Name">Dsicounts</label>
            <Input placeholder="Specify if there are promotions, discounts"/>
        </div>
        {/*Product Description*/}
        <div className="product__item">
            <label htmlFor="Name">Product Description</label>
            <TextArea placeholder="Minimum of 1000 words"/>
        </div>
      </FlexibleDiv>
        </FlexibleDiv>  
        }

      {/* Add Button */}
      <FlexibleDiv justifyContent="end">
        <Button onClick={handleCreateProduct}>
          Add Product
        </Button>
      </FlexibleDiv>
      {/* Modal */}
        <StyledModal maskClosable={true} open={openModal} centered closeIcon={null} className="modal" footer={null}>
          <h2 style={{textAlign:"center"}}>Product Submission Received</h2>
          <p style={{textAlign:"center",margin:"16px 0px", color:"#777777"}}>Thank you for adding your product to our platform. Your listing has been received and is now in the review process. Our team will carefully assess your product to ensure it meets our quality standards and guidelines.</p>
          <FlexibleDiv flexWrap="nowrap" gap="24px">
            <Button border="1px solid #FC5353" color="#FC5353" hoverBg="white" hoverColor="var(--oosriPrimary)" width="100%" onClick={()=>setOpenModal(false)}>Cancel</Button>
            <Button border="1px solid #FC5353" color="white" backgroundColor="var(--oosriPrimary)" width="100%">Back to Dashboard</Button>
          </FlexibleDiv>
        </StyledModal>
      </CreateProductPageWrapper>
    </DashboardLayout>
  );
}

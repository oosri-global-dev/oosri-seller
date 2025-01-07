"use client";

import { CreateProductPageWrapper } from "./index.styles";
import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Button from "@/components/lib/Button";
import HeaderTextAndSub from "../Product/simple-components/simple-components";
import { useEffect, useState } from "react";
import { Input, Tabs } from "antd";
import Select from "@/components/lib/Select";
import { CustomUpload } from "@/components/lib/CustomUpload";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { MobileTab } from "./Tabs/mobile";
import { TabletTab } from "./Tabs/tablet";
import { WatchesTab } from "./Tabs/watches";
import { createProduct, getCategories } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";
const { TextArea } = Input;

export default function CreateProductPage(){
  const [activeTab,setActiveTab]=useState("mobile")
  const [openModal,setOpenModal]=useState(false)
  const[categories,setCategories]=useState([]) 
  const [displayCategories,setDisplayCategories]=useState()
  const[loading,setLoading]=useState(true)

  const [img1,setImg1]=useState()
  const [img2,setImg2]=useState()
  const [img3,setImg3]=useState()
  const [img4,setImg4]=useState()
  useEffect(()=>{
    const fetchAllProducts= async()=>{
      try{
        const data= await getCategories()
        const newCategories = categories;
        const items=[]

        for (let index = 0; index < data.data.data.length; index++) {
          newCategories.push(data.data.data[index]);    
          items.push(
            {
              key:data.data.data[index].name,
              label:data.data.data[index].name,
            }
          ) 
        }
        setCategories(newCategories);
        setDisplayCategories(items)
        setLoading(false)
      }catch(errors){
        console.log(errors)
      }
    }
    fetchAllProducts()
  },[])

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
    <>
      {
        loading
        ?
        <CustomLoader />
     : <DashboardLayout title={"Add Product"} showBackBtn>
        <CreateProductPageWrapper>
          <Tabs
          className="tabs__custom"
          defaultActiveKey="1"
          items={displayCategories}
          onChange={(e) => {setActiveTab(e)}} />
          <MobileTab />

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
    }
    </>
  );
}

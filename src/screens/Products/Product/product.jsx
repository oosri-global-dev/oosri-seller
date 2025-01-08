import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { ProductWrapper } from "./product.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import HeaderTextAndSub from "./simple-components/simple-components";
import ProductImage from "@/assets/images/profile.jpg";
import Button from "@/components/lib/Button";
import { useEffect, useState } from "react";
// import EditProduct from "../Edit/edit-product";
import { getProduct } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";

export default function Product() {
  const [edit,setEdit]=useState(false)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const fetchProductData=async ()=>{
      let id = window.location.pathname
      let regex = /\/product\/([a-f0-9]{24})/;
      let match = id.match(regex);
      try{
        if (match) {
          id = match[1].trim();
          console.log("Extracted ID:",id);
        } else {
          console.log("No ID found.");
        }
        const data= await getProduct(id)
        console.log(data)
        setLoading(false)
      }catch(error){
        console.log(error)
      }
    }
    fetchProductData()
  },[])
  return (
    <>
    {
      loading?
      <CustomLoader/>
      :
    <DashboardLayout title={"Product Detail"} showBackBtn>
        {edit?
        <div>
          {/* <EditProduct />    */}
        <ProductWrapper>
          <FlexibleDiv justifyContent="end" alignItems="start">
              <Button className="edit__button" onClick={()=>{setEdit(true)}}>
                Save Changes
              </Button>
          </FlexibleDiv>
        </ProductWrapper>
        </div>:
        <ProductWrapper>
        {/* Product Name Section */}
        <FlexibleDiv justifyContent="space-between" alignItems="start">
            <HeaderTextAndSub title={"Product ID"} content={"1234567890"} />
            <Button className="edit__button" onClick={()=>{setEdit(true)}}>
              Edit
            </Button>
        </FlexibleDiv>
        <FlexibleDiv width="100%" alignItems="start" justifyContent="start" className="image_text_holder" gap="48px">
          <FlexibleDiv flexDir="column" alignItems="start" gap="24px" width="40%" justifyContent="start">
            {/* Name and color */}
            <FlexibleDiv alignItems="start" justifyContent="start" gap="30%" flexWrap="nowrap" className="text__item">
              <HeaderTextAndSub title={"Product Name"} content={"Inifinx Smart 5 Pro"}/>
              <HeaderTextAndSub title={"Color"} content={"Black"} />
            </FlexibleDiv>
            <HeaderTextAndSub title={"Product Category"} content={"Mobile Phone"} />
            <HeaderTextAndSub title={"Country"} content={"United States"} />
            <HeaderTextAndSub title={"Brand"} content={"Apple"} />
            <HeaderTextAndSub title={"Model"} content={"A2645"} />
            <HeaderTextAndSub title={"Condition"} content={"Used"} />
            <HeaderTextAndSub title={"Sub Condition"} content={"Sub Condition"} />
            <HeaderTextAndSub title={"Quantity Available (Stock)"} content={"40"} />
            <HeaderTextAndSub title={"Display Type"} content={"LCD"} />
            <HeaderTextAndSub title={"Selfie Camera"} content={"Mega Pixel"} />
          </FlexibleDiv>
          {/* Image an text */}
          <FlexibleDiv gap="24px" flexDir="column" alignItems="start" width="fit-content">
            <FlexibleDiv flexDir="row" alignItems="start" width="fit-content" gap="8px">
              <img src={ProductImage.src} alt="" />
              <img src={ProductImage.src} alt="" />
              <img src={ProductImage.src} alt="" />
            </FlexibleDiv>
            <HeaderTextAndSub title={"SIM Type"} content={"Inifinx Smart 5 Pro"} />
            <HeaderTextAndSub title={"Price"} content={"$799.99"} />
            <HeaderTextAndSub title={"Operating Sytem"} content={"iOS 15"} />
            <HeaderTextAndSub title={"Discount"} content={"$600"} />
            <HeaderTextAndSub title={"Storage Capacity"} content={"128GB"} />
            <HeaderTextAndSub title={"Product Description"} content={"MobileMaster is your trusted destination for all things mobile technology. With years of experience in the industry, we are dedicated to delivering top-notch products and services to meet your mobile needs.e offer a wide range of the latest smartphones, from top brands to budget-friendly options. Our knowledgeable staff can help you find the perfect phone to suit your needs."} />            
          </FlexibleDiv>
        </FlexibleDiv>
      </ProductWrapper>
        }
    </DashboardLayout>
    }
    </>
  );
}

import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { ProductWrapper } from "./product.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import HeaderTextAndSub from "./simple-components/simple-components";
import ProductImage from "@/assets/images/profile.jpg";
import Button from "@/components/lib/Button";
import { useEffect, useState } from "react";
import EditProduct from "../Edit/edit-product";
import { getProduct } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";
import { ProductDetails } from "./productDetails";

export default function Product() {
  const [edit,setEdit]=useState(false)
  const [loading,setLoading]=useState(true)
  const[productData,setProductData]=useState()
  const [id,setId]=useState()

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
        setProductData(data.data.data)
        setId(id)
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
          <EditProduct data={productData} id={id} setEdit={setEdit} />   
        </div>
        :
        <ProductWrapper>
          <ProductDetails data={productData}/>
        </ProductWrapper>
        }
    </DashboardLayout>
    }
    </>
  );
}

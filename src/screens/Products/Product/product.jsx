import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { ProductWrapper } from "./product.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import HeaderTextAndSub from "./simple-components/simple-components";
import ProductImage from "@/assets/images/profile.jpg";
import Button from "@/components/lib/Button";

export default function Product() {
  return (
    <DashboardLayout title={"Product Detail"} showBackBtn>
      <ProductWrapper>
        <FlexibleDiv justifyContent="space-between" alignItems="start">
            <HeaderTextAndSub title={"Product ID"} content={"1234567890"} />
            <Button className="edit__button">
              Edit
            </Button>
        </FlexibleDiv>
        {/* Product Name Section */}
        <FlexibleDiv width="100%" alignItems="start" justifyContent="start" className="image_text_holder" gap="48px">
          <FlexibleDiv flexDir="column" alignItems="start" gap="10%" width="40%" justifyContent="start">
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
        
        {/* Not mine */}
        {/* <FlexibleDiv
          className="right__section"
          flexDir="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="35px"
        >
          <HeaderTextAndSub title={"Product ID"} content={"1234567890"} />
          <FlexibleDiv
            className="image__sections"
            flexDir="row"
            justifyContent="space-between"
            flexWrap="nowrap"
            // gap="10px"
          >
            <img
              src={ProductImage.src}
              className="product__image"
              alt="product"
            />
            <img
              src={ProductImage.src}
              className="product__image"
              alt="product"
            />
            <img
              src={ProductImage.src}
              className="product__image"
              alt="product"
            />
          </FlexibleDiv>
          <HeaderTextAndSub
            title={"SIM Type"}
            content={"Infinix Smart 5 Pro"}
          />
          <HeaderTextAndSub title={"Operating System"} content={"iOS 15"} />
          <HeaderTextAndSub title={"Price"} content={"$799.5"} />
          <HeaderTextAndSub title={"Discount"} content={"$600"} />
          <HeaderTextAndSub title={"Storage Capacity"} content={"128 GB"} />
          <HeaderTextAndSub
            title={"Product Description"}
            content={
              "MobileMaster is your trusted destination for all things mobile technology. With years of experience in the industry, we are dedicated to delivering top-notch products and services to meet your mobile needs.e offer a wide range of the latest smartphones, from top brands to budget-friendly options. Our knowledgeable staff can help you find the perfect phone to suit your needs."
            }
          />
        </FlexibleDiv> */}
      </ProductWrapper>
    </DashboardLayout>
  );
}

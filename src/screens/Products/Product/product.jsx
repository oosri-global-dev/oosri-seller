import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { ProductWrapper } from "./product.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import HeaderTextAndSub from "./simple-components/simple-components";
import ProductImage from "@/assets/images/profile.jpg";

export default function Product() {
  return (
    <DashboardLayout title={"Product"} showBackBtn>
      <ProductWrapper>
        <FlexibleDiv
          className="left__section"
          flexDir="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="35px"
        >
          <HeaderTextAndSub title={"Seller Name"} content={"Opeyemi Gadget"} />
          <img
            src={ProductImage.src}
            className="product__image"
            alt="product"
          />
          <FlexibleDiv flexWrap="nowrap" justifyContent="space-between">
            <HeaderTextAndSub title={"Product Name"} content={"iPhone 15"} />
            <HeaderTextAndSub title={"Color"} content={"Black"} />
          </FlexibleDiv>
          <HeaderTextAndSub
            title={"Product Category"}
            content={"Mobile Phone"}
          />
          <HeaderTextAndSub title={"Country"} content={"United States"} />
          <HeaderTextAndSub title={"Brand"} content={"Apple"} />
          <HeaderTextAndSub title={"Model"} content={"A254S"} />
          <HeaderTextAndSub title={"Condition"} content={"Used"} />
          <HeaderTextAndSub
            title={"Quantity Available (Stock)"}
            content={"40"}
          />
          <HeaderTextAndSub title={"Display Type"} content={"LCD"} />
          <HeaderTextAndSub title={"Selfie Camera"} content={"Mega Pixel"} />
        </FlexibleDiv>
        <FlexibleDiv
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
        </FlexibleDiv>
      </ProductWrapper>
    </DashboardLayout>
  );
}

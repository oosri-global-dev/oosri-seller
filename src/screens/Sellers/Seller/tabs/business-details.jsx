import { FlexibleDiv } from "@/components/lib/Box/styles";
import { SellerWrapper } from "../seller.styles";
import HeaderTextAndSub from "@/screens/Products/Product/simple-components/simple-components";
import GovVerification from "@/assets/images/profile.jpg";

export default function BusinessDetails() {
  return (
    <SellerWrapper>
      <FlexibleDiv
        className="business__details"
        flexDir="column"
        alignItems="flex-start"
      >
        <p className="title__text">Business Information</p>
        <FlexibleDiv flexDir="row" gap="25px" justifyContent="flex-start">
          <HeaderTextAndSub title="Business Name" content="Henry Collins" />
          <HeaderTextAndSub title="Business Type" content="Partnership" />
        </FlexibleDiv>
        <FlexibleDiv flexDir="row" gap="30px" justifyContent="flex-start">
          <HeaderTextAndSub
            title="Business Registration Number"
            content="12-3746454"
          />
          <HeaderTextAndSub
            title="Business Address"
            content="123 Main Street, Suite 456 Anytown, CA 98765, United States"
          />
        </FlexibleDiv>
        <HeaderTextAndSub
          title="Business Description"
          content="MobileMaster is your trusted destination for all things mobile technology. With years of experience in the industry, we are dedicated to delivering top-notch products and services to meet your mobile needs.e offer a wide range of the latest smartphones, from top brands to budget-friendly options. Our knowledgeable staff can help you find the perfect phone to suit your needs."
        />
        <FlexibleDiv
          className="gov__identification"
          flexDir="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="10px"
        >
          <HeaderTextAndSub title="Government Identification" />
          <div className="img__wrapper">
            <img src={GovVerification.src} alt="government-identification" />
          </div>
        </FlexibleDiv>
        <FlexibleDiv
          className="gov__identification"
          flexDir="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="10px"
        >
          <HeaderTextAndSub title="Business Registration Certificate" />
          <div className="img__wrapper">
            <img src={GovVerification.src} alt="government-identification" />
          </div>
        </FlexibleDiv>
      </FlexibleDiv>
    </SellerWrapper>
  );
}

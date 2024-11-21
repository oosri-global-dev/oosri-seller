import { FlexibleDiv } from "@/components/lib/Box/styles";
import { SellerWrapper } from "../seller.styles";
import HeaderTextAndSub from "@/screens/Products/Product/simple-components/simple-components";
import ProductImage from "@/assets/images/profile.jpg";

export default function PersonalDetails() {
  return (
    <SellerWrapper>
      <FlexibleDiv
        className="personal__details"
        flexDir="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <FlexibleDiv
          width="45%"
          flexDir="column"
          flexWrap="nowrap"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="40px"
          className="left__section"
        >
          <p className="title__text">Personal Information</p>
          <FlexibleDiv
            className="personal__info__content"
            flexDir="row"
            flexWrap="nowrap"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <FlexibleDiv width="60%" justifyContent="flex-start">
              <HeaderTextAndSub
                title="Full Legal Name"
                content="Henry Collins"
              />
            </FlexibleDiv>
            <HeaderTextAndSub title="Sex" content="Male" />
          </FlexibleDiv>
          <FlexibleDiv
            className="personal__info__content"
            flexDir="row"
            flexWrap="nowrap"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <FlexibleDiv width="60%" justifyContent="flex-start">
              <HeaderTextAndSub
                title="Email Address"
                content="henrycollins23@gmail.com"
              />
            </FlexibleDiv>
            <HeaderTextAndSub title="Phone Number" content="+2347011046109" />
          </FlexibleDiv>
          <FlexibleDiv
            className="personal__info__content"
            flexDir="row"
            flexWrap="nowrap"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap="50px"
          >
            <FlexibleDiv width="50%" justifyContent="flex-start">
              <HeaderTextAndSub
                title="Physical Address"
                content="123 Main Street, Suite 456 Anytown, CA 98765, United States"
              />
            </FlexibleDiv>
            <HeaderTextAndSub
              title="Date of Birth"
              content="14th, August 1995"
            />
          </FlexibleDiv>
          <FlexibleDiv
            className="personal__info__content"
            flexDir="row"
            flexWrap="nowrap"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <FlexibleDiv width="60%" justifyContent="flex-start">
              <HeaderTextAndSub title="Country" content="United States" />
            </FlexibleDiv>
            <HeaderTextAndSub
              title="Registration Date"
              content="11th August, 2019"
            />
          </FlexibleDiv>
        </FlexibleDiv>

        {/* right section */}
        <FlexibleDiv
          width="40%"
          flexDir="column"
          alignItems="flex-end"
          className="right__section"
          gap="10px"
        >
          <p className="status__text">
            Status: <span>Verified</span>
          </p>
          <img className="seller__image" src={ProductImage.src} alt="seller" />
        </FlexibleDiv>
      </FlexibleDiv>
    </SellerWrapper>
  );
}

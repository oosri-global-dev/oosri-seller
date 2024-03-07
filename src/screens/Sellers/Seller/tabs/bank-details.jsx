import { FlexibleDiv } from "@/components/lib/Box/styles";
import { SellerWrapper } from "../seller.styles";
import HeaderTextAndSub from "@/screens/Products/Product/simple-components/simple-components";

export default function BankDetails() {
  return (
    <SellerWrapper>
      <FlexibleDiv
        className="bank__details"
        flexDir="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <p className="title__text">Bank Information</p>
        <FlexibleDiv
          flexDir="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="21%"
          flexWrap="nowrap"
        >
          <HeaderTextAndSub title="Account Name" content="Opeyemi Gadget" />
          <HeaderTextAndSub title="Bank" content="Access Bank" />
          <HeaderTextAndSub />
        </FlexibleDiv>
        <FlexibleDiv
          flexDir="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="20%"
          flexWrap="nowrap"
        >
          <HeaderTextAndSub title="Account Number" content="2092460593" />
          <HeaderTextAndSub
            title="National Identification Number"
            content="73743930943084302420"
          />
          <HeaderTextAndSub />
        </FlexibleDiv>
      </FlexibleDiv>
    </SellerWrapper>
  );
}

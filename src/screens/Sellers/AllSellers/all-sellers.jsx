import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { AllSellersWrapper } from "./all-sellers.styles";
import { useState } from "react";
import { Tabs, Table } from "antd";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import TextField from "@/components/lib/TextField";
import { LuArrowUpDown as FilterArrow } from "react-icons/lu";
import Button from "@/components/lib/Button";
import AllSellersTab from "./tabs/all-sellers/all-sellers-tab";
import NewSellersTab from "./tabs/new-sellers/new-sellers-tab";

export default function AllSellers() {
  const [activeTab, setActiveTab] = useState("all-sellers");
  const items = [
    {
      key: "1",
      label: "All Sellers",
    },
    {
      key: "2",
      label: "New Sellers",
    },
    {
      key: "3",
      label: "Seller Verification",
    },
  ];

  return (
    <DashboardLayout title="Sellers">
      <AllSellersWrapper>
        <Tabs
          className="tabs__custom"
          defaultActiveKey="1"
          items={items}
          onChange={(e) =>
            e === "1"
              ? setActiveTab("all-sellers")
              : e === "2"
              ? setActiveTab("new-sellers")
              : setActiveTab("seller-verification")
          }
        />

        {/* sellers content */}
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
            {activeTab === "all-sellers" && <AllSellersTab />}
            {activeTab === "new-sellers" && <NewSellersTab />}
          </FlexibleDiv>
        </FlexibleDiv>
      </AllSellersWrapper>
    </DashboardLayout>
  );
}

import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { AllProductsWrapper, TopMenuWrapper } from "./all-products.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Table, Tabs } from "antd";
import {
  productsTableColumns,
  productsTableData,
} from "@/utils/products-helpers";
import Button from "@/components/lib/Button";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import TextField from "@/components/lib/TextField";
import { LuArrowUpDown as FilterArrow } from "react-icons/lu";
import { useState } from "react";

export default function AllProductsScreen() {
  const [activeTab, setActiveTab] = useState("products");
  const items = [
    {
      key: "1",
      label: "Products",
    },
    {
      key: "2",
      label: "Pending Products",
    },
  ];
  return (
    <DashboardLayout title={"Products"}>
      <TopMenuWrapper>
        <Tabs
          className="tabs__custom"
          defaultActiveKey="1"
          items={items}
          onChange={(e) =>
            e === 1 ? setActiveTab("products") : setActiveTab("pendingProducts")
          }
        />
      </TopMenuWrapper>
      <AllProductsWrapper>
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
            {activeTab === "products" ? (
              <Table
                columns={productsTableColumns}
                dataSource={productsTableData}
                className="table__class"
              />
            ) : (
              <Table
                columns={productsTableColumns}
                dataSource={productsTableData}
                className="table__class"
              />
            )}
          </FlexibleDiv>
        </FlexibleDiv>
      </AllProductsWrapper>
    </DashboardLayout>
  );
}

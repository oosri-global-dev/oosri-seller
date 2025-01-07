import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { AllProductsWrapper, TopMenuWrapper } from "./all-products.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Table, Tabs } from "antd";
import {
  productsTableColumns,
} from "@/utils/products-helpers";
import Button from "@/components/lib/Button";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import TextField from "@/components/lib/TextField";
import { LuArrowUpDown as FilterArrow } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";
import { isBusinessActive } from "@/utils/business-checker";
import { NO_BUSINESS_MODAL } from "@/context/types";
import { getAllProducts } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";

export default function AllProductsScreen() {
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(true);
  const [allProducts,setAllProducts]=useState([])
  const { push } = useRouter();
  const {
    dispatch,
    state: { user },
  } = useMainContext();

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

  const productsTableData = [
    {
      key: "orderId",
      sellerName: "Henry Collins",
      productName: "Nokia A23",
      productId: "P12345",
      price: "$100",
      country: "Nigeria",
      instock: "50",
    },
    {
      key: "orderId",
      sellerName: "Henry Collins",
      productName: "Nokia A23",
      productId: "P12345",
      price: "$100",
      country: "Nigeria",
      instock: "50",
    },
    {
      key: "orderId",
      sellerName: "Henry Collins",
      productName: "Nokia A23",
      productId: "P12345",
      price: "$100",
      country: "Nigeria",
      instock: "50",
    },
    {
      key: "orderId",
      sellerName: "Henry Collins",
      productName: "Nokia A23",
      productId: "P12345",
      price: "$100",
      country: "Nigeria",
      instock: "50",
    },
  ];

  useEffect(()=>{
    const fetchAllProducts=async()=>{
      try{
        const data = await getAllProducts()
        setLoading(false)
        setAllProducts(data.data.data)
      }catch(error){
        if(error.message == "Request failed with status code 404"){
          push("product/create")
        }else{
          setLoading(false)
        }
      }
    }
    fetchAllProducts()
  },[])

  return (
    <>
    {loading?
    <CustomLoader />  
    :
      <DashboardLayout title={"Products"}>
        <FlexibleDiv
          width="100%"
          justifyContent="flex-end"
          margin="0px 0px 20px 0"
        >
          <Button
            backgroundColor="var(--oosriPrimary)"
            color="#fff"
            onClick={() => {
              if (isBusinessActive(user)) {
                push("/product/create");
              } else {
                dispatch({
                  type: NO_BUSINESS_MODAL,
                  payload: true,
                });
              }
            }}
          >
            + Add New Product
          </Button>
        </FlexibleDiv>

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
                  dataSource={allProducts}
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
    }
    </>
  );
}

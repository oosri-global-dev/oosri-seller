import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { AllSellersWrapper } from "../../screens/Sellers/AllSellers/all-sellers.styles";
import { Tabs, Table } from "antd";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import TextField from "@/components/lib/TextField";
import { LuArrowUpDown as FilterArrow } from "react-icons/lu";
import { useState } from "react";
import Button from "@/components/lib/Button";
import "chartkick/chart.js";
import { AreaChart } from "react-chartkick";
import { summaryBoxes2 } from "@/utils/dashboard-helpers";
import { DashboardWrapper } from "./sellers-analytics.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import IphoneImage from "@/assets/images/iphone.png"
import IwatchImage from "@/assets/images/iwatch.png"


export default function SellerAnalytics() {

    const [filters, setFilters] = useState([
        "Daily",
        "Weekly",
        "Monthly",
        "Yearly",
      ]);
      const [selectedFilter, setSelectedFilter] = useState("Daily");
    
      const graphOptions = {
        Jan: 2,
        Feb: 5,
        Mar: 3,
        Apr: 5,
        May: 8,
        Jun: 9,
        Aug: 8,
        Sep: 10,
        Oct: 6,
        Nov: 8,
        Dec: 2,
      };

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

      const topSellingProduct = {
        image: {IphoneImage},
        name: "Iphone XS Max",
        sold: 90,
        change: 2.8,
        increase: true,
      };
    
      const leastPurchasedProduct = {
        image: {IwatchImage},
        name: "Apple Series 8 Watch",
        sold: 10,
        change: -2.8,
        increase: false,
      };

    return (
        <DashboardLayout title="Sale Report"> 
            <DashboardWrapper>
            <FlexibleDiv className="summary__wrapper">
          {summaryBoxes2.map((sgn, idx) => (
            <FlexibleDiv className="single__summary__box" key={idx}>
              <div className="icon__wrapper">{sgn.icon}</div>
              <div className="summary__text">
                <h1>{sgn.value}</h1>
                <p className="label__text">{sgn.label}</p>
              </div>
            </FlexibleDiv>
          ))}
            </FlexibleDiv>
            
            <FlexibleDiv
          flexDir="column"
          className="graph__section"
          flexWrap="nowrap"
          gap="40px"
        >
          <FlexibleDiv
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="nowrap"
            className="graph__info__wrapper"
          >
            <FlexibleDiv
              width="fit-content"
              flexDir="column"
              alignItems="flex-start"
              className="graph__info"
            >
              <h4>Sales Overview</h4>
              <p>Jan 2023 - Dec 2023</p>
            </FlexibleDiv>
            <FlexibleDiv
              flexDir="row"
              flexWrap="nowrap"
              width="fit-content"
              gap="15px"
            >
              {filters.map((sgn, idx) => (
                <Button
                  backgroundColor={
                    selectedFilter === sgn ? "var(--oosriPrimary)" : "#F5F5F5"
                  }
                  hoverBg="var(--oosriPrimary)"
                  height="35px"
                  radius="20px"
                  key={idx}
                  color={
                    selectedFilter === sgn ? "var(--oosriWhite)" : "#757575"
                  }
                  onClick={() => setSelectedFilter(sgn)}
                >
                  {sgn}
                </Button>
              ))}
            </FlexibleDiv>
          </FlexibleDiv>
          <FlexibleDiv width="100%" className="graph__box">
            <AreaChart data={graphOptions} />
          </FlexibleDiv>
            </FlexibleDiv>

            <FlexibleDiv
            margin="70px 0 40px 0"
            border="1px solid var(--oosriFadedWhite)"
            padding="10px 15px 60px 15px"
            className="report__section"
            style={{
            borderRadius: "10px",

            }}
            >

              <FlexibleDiv 
              flexDir="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              className="report__box"
              style={{
                borderBottom: "1px solid var(--oosriFadedWhite)",
    
                }}>
              <p>Purchasing Report</p>
              <p>Generate sales record from product</p>
            </FlexibleDiv>

          <FlexibleDiv className="product__report">
            
            <FlexibleDiv 
            flexDir="column"
            alignItems="flex-start"
            className="product__box">

              

              <FlexibleDiv 
              className="product__info">

                {/* Top Selling Product */}
                <FlexibleDiv 
                flexDir="row"
                alignItems="center"
                width="50%"
                justifyContent="flex-start"
                gap="15px"
                className="product__info"
                >
                <p style={{
                color: "var(--oosriFadedWhite)",
                }}>TOP SELLING PRODUCT</p>

                <FlexibleDiv
                justifyContent="flex-start" 
                alignItems="center"
                gap="15px"
                >
                <div>
                <img src={IphoneImage.src} style={{
                width: "70px", borderRadius: "10px"
                }} alt={topSellingProduct.name} />
                </div>

              <div>
              <h4>{topSellingProduct.name}</h4>
              <p>{topSellingProduct.sold} sold</p>
              </div>

                <div style={{
                paddingLeft: "30px",
              }}>
                <p style={{ color: topSellingProduct.increase ? 'green' : 'red' }}>
                  {topSellingProduct.increase ? `↑` : `↓`} {Math.abs(topSellingProduct.change)}% from last week
                </p>
                </div>
              </FlexibleDiv>
                </FlexibleDiv>

                
                {/* Least Purchased Product */}
                <FlexibleDiv 
                flexDir="row"
                alignItems="center"
                width="50%"
                justifyContent="flex-start"
                gap="15px"
                className="product__info">

                <p style={{
                color: "var(--oosriFadedWhite)",
                }}>LEAST PURCHASED</p>

                <FlexibleDiv
                justifyContent="flex-start" 
                gap="15px"
                alignItems="center"
                >
                <div>
              <img src={IwatchImage.src} style={{
                width: "70px", borderRadius: "10px"
              }} alt={leastPurchasedProduct.name} />
              </div>

              <div>
              <h4>{leastPurchasedProduct.name}</h4>
                <p>{leastPurchasedProduct.sold} sold</p>
              </div>

                <div style={{
                paddingLeft: "30px",
              }}>
                <p style={{ color: leastPurchasedProduct.increase ? 'green' : 'red' }}>
                  {leastPurchasedProduct.increase ? `↑` : `↓`} {Math.abs(leastPurchasedProduct.change)}% from last week
                </p>
                </div>
              </FlexibleDiv>
                </FlexibleDiv>

              </FlexibleDiv>

          </FlexibleDiv>
        </FlexibleDiv>
            </FlexibleDiv>

            {/* Product Report */}
            <FlexibleDiv 
            flexDir="column"
            alignItems="flex-start"
            className="product__report__section">
            <p>Product Report</p>
            <p>Generate sales record from product</p>

            <AllSellersWrapper>
            

            {/* sellers content */}
            <FlexibleDiv
            border="2px solid red"

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

            <FlexibleDiv
              flexDir="row"
              flexWrap="nowrap"
              width="fit-content"
              gap="15px"
            >
              {filters.map((sgn, idx) => (
                <Button
                  backgroundColor={
                    selectedFilter === sgn ? "var(--oosriPrimary)" : "#F5F5F5"
                  }
                  hoverBg="var(--oosriPrimary)"
                  height="35px"
                  radius="20px"
                  key={idx}
                  color={
                    selectedFilter === sgn ? "var(--oosriWhite)" : "#757575"
                  }
                  onClick={() => setSelectedFilter(sgn)}
                >
                  {sgn}
                </Button>
              ))}
            </FlexibleDiv>
          </FlexibleDiv>
          <FlexibleDiv>
            <Table>

            </Table>
          </FlexibleDiv>
            </FlexibleDiv>

            </AllSellersWrapper>

          
            </FlexibleDiv>


            </DashboardWrapper>
        </DashboardLayout>
    )
}
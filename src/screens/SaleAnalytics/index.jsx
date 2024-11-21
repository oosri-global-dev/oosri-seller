import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { salesBoxes } from "@/utils/dashboard-helpers";
import { SaleAnalyticsWrapper } from "./index.styles";
import {  useState } from "react";
import Button from "@/components/lib/Button";
import SalesChart from "./sales-chart";
import Select from "@/components/lib/Select";
import { ProductReportData } from "@/utils/sale-analytics";
import { HiOutlineChartBar } from "react-icons/hi2";
import { CustomMultiSearchBar } from "@/components/lib/MultiSearchBar";
import PurchasingChart from "./purchasing-chart";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import TopSellingProduct from "@/assets/images/topSellingProduct.png"
import LeastSellingProduct from "@/assets/images/leastSellingProduct.png"

export default function SaleAnalytics(){
  const [filters, setFilters] = useState([
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
  ]);
  const[selectedFilter,setSelectedFilter]=useState("Yearly")

  const options=[
      { value: "This Year", label: "This Year" },
  ]

  const [productReport,setProductReport]=useState(false)

    return(
        <DashboardLayout title={"Sale Report"} titleSubText={"Jan 2022-Dec 2022"}>
          <SaleAnalyticsWrapper>
            <FlexibleDiv className="summary__wrapper" justifyContent="start" >
              {salesBoxes.map((sgn, idx) => (
                  <FlexibleDiv className="single__summary__box" key={idx}>
                  <div className="icon__wrapper">{sgn.icon}</div>
                  <div className="summary__text">
                      <h1>{sgn.value}</h1>
                      <p className="label__text">{sgn.label}</p>
                  </div>
                  </FlexibleDiv>
              ))}
            </FlexibleDiv>
            {/* Filter Menus */}
             <FlexibleDiv 
              justifyContent="end"
              margin="80px 0px 0px 0px"
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
             {/* Chart Section */}
             <FlexibleDiv width="100%" height="300px" className="graph__box">
               <SalesChart />
             </FlexibleDiv>
             {/*Purchasing Reports */}
             <FlexibleDiv className="table__section" justifyContent="space-around" margin="80px 0px 0px 0px">
              <FlexibleDiv
                flexDir="row"
                width="100%"
                justifyContent="space-between"
                padding="0 30px"
                className="top__recent__box"
              >
                <div>
                  <h1>Purchasing Report</h1>
                  <p>Generate sales record from product </p>
                </div>
                  <Select  options={options} defaultValue="This Year"/>
              </FlexibleDiv>
              <FlexibleDiv flexDir="row" 
              flexWrap="noWrap"
              padding="0 30px"
              alignItems="start"
              className="recent__sale__wrapper" >
                <FlexibleDiv justifyContent="start" flexDir="column"  alignItems="start" className="item__box1 item__box" >
                  <h2>Top SELLING PRODUCT</h2>
                  <FlexibleDiv padding="50px 50px 80px 0px" justifyContent="start" flexWrap="noWrap" flexDir="row">
                    <FlexibleDiv className="image__text" justifyContent="column" flexWrap="noWrap" flexDir="row">
                      <img className="product__image" src={TopSellingProduct.src}/>
                      <FlexibleDiv flexDir="column" justifyContent="start" alignItems="start">
                        <h5>Iphone XS Max</h5>
                        <p className="percent__increase">90 sold</p>
                      </FlexibleDiv>
                    </FlexibleDiv>
                    {/* Chart */}
                    <FlexibleDiv width="300px" >
                      <PurchasingChart increasing={true} />
                      <FlexibleDiv flexWrap="noWrap" margin="6px 0px" gap="2px">
                        <span className="percent__increase"> <FaArrowUp /> </span>
                          <p className="percent__increase">2.8%</p>
                          <p className="neutral">from last week</p>
                      </FlexibleDiv>
                    </FlexibleDiv>
                  </FlexibleDiv>
                </FlexibleDiv>
                {/*  */}
                <FlexibleDiv justifyContent="start" flexDir="column"  alignItems="start" className="item__box2 item__box">
                  <h2>LEAST PURCHASED</h2>
                  <FlexibleDiv padding="50px 50px 80px 0px" flexWrap="noWrap">
                    <FlexibleDiv flexDir="row" flexWrap="noWrap" justifyContent="start" className="image__text">
                      <img className="product__image" src={LeastSellingProduct.src} />
                      <FlexibleDiv flexDir="column" justifyContent="start" alignItems="start">
                        <h5>Apple Series 8 Watch</h5>
                        <p className="percent__increase">10 sold</p>
                      </FlexibleDiv>
                    </FlexibleDiv>
                    {/* Chart */}
                    <FlexibleDiv width="300px" >
                      <PurchasingChart />
                      <FlexibleDiv flexWrap="noWrap" margin="6px 0px" gap="2px">
                        <span className="percent__decrease"> <FaArrowDown /> </span>
                          <p className="percent__decrease">2.8%</p>
                          <p className="neutral">from last week</p>
                      </FlexibleDiv>
                    </FlexibleDiv>
                  </FlexibleDiv>
                </FlexibleDiv>
              </FlexibleDiv>
            </FlexibleDiv>
            {/* Product Reports */}
               <div className="product__report">
                 <h1>Product Report</h1>
                 <p>Generate sales record from product </p>
               </div>
             <FlexibleDiv className="table__section" justifyContent="space-around">
              <FlexibleDiv
                flexWrap="noWrap"
                width="100%"
                justifyContent="space-between"
                padding="0 30px"
                className="top__recent__box"
              >
                <FlexibleDiv width="50%">
                  <CustomMultiSearchBar Multi={true} placeholder="search by product name"/>
                </FlexibleDiv>
                  <FlexibleDiv
                     gap="15px"
                     justifyContent="end"
                     width="100%">
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
              {/* Table Section */}
              {productReport?
                <FlexibleDiv flexDir="row" 
                flexWrap="noWrap"
                padding="0 30px"
                className="recent__sale__wrapper" >
                    <FlexibleDiv justifyContent="start" flexDir="column" alignItems="start">
                      <h2 className="search__text">Iphone sales</h2>
                      <FlexibleDiv gap="15px" className="report__table" padding="0px 10px 0px 0px">
                        {ProductReportData.map((item)=>{
                          return(
                            <FlexibleDiv justifyContent="space-between" flexWrap="noWrap">
                              <FlexibleDiv gap="15px" justifyContent="start" >
                                <img src="https://placehold.co/40x40/png" alt="pictures" />
                                <div>
                                  <h5>{item.name}</h5>
                                  <h2 style={{fontSize:"12px"}}>{item.soldNum} sold</h2>
                                </div>
                              </FlexibleDiv>
                              <h5>{item.amount}</h5>
                            </FlexibleDiv>
                          )
                        })}
                      </FlexibleDiv>
                    </FlexibleDiv>
                  {/*  */}
                    <FlexibleDiv flexDir="column" justifyContent="space-around" className="total__earnings" gap="5px">
                      <p>Total Earning </p>
                      <h3>N5,960.000</h3>
                    </FlexibleDiv>
                </FlexibleDiv>
                :
                // Empty Table
                 <FlexibleDiv className="empty__search" gap="15px" flexDir="column" padding="30px 0px">
                  <div>
                    <HiOutlineChartBar />
                  </div>
                  <p>Generated records will appear here</p>
                 </FlexibleDiv>
                }
            </FlexibleDiv>
          </SaleAnalyticsWrapper>
        </DashboardLayout>
    )
}
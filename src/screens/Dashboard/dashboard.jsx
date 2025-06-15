import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { DashboardWrapper } from "./dashboard.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Button from "@/components/lib/Button";
import { useEffect, useState } from "react";
import "chartkick/chart.js";
import { AreaChart } from "react-chartkick";
import { Table } from "antd";
import {
  dashboardTableColumns,
  dashboardTableData,
} from "@/utils/dashboard-helpers";
import Link from "next/link";

import CustomLoader from "@/components/lib/CustomLoader";
import { GoStack as StackIcon } from "react-icons/go";
import { IoBagOutline as BagIcon } from "react-icons/io5";
import { CiCreditCard1 as CardIcon } from "react-icons/ci";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardScreen() {
  const [filters, setFilters] = useState([
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
  ]);
  const [selectedFilter, setSelectedFilter] = useState("Daily");
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState({
  //   averageOrderValue: 0, 
  //   payout: 0,
  //   totalOrders: 0,
  //   totalProducts: 0,
  //   totalSales: 0
  // });

  const { data, isLoading, error} = useDashboardData(selectedFilter.toLowerCase());
  const dashboardSummary = data?.overview?.data?.data || {};
  const dashboardSalesOverview = data?.summary?.data?.data || {};

  const [graphOptions, setGraphOptions] = useState({})
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const fetchSalesOverview = async () => {
    const graphOptions = {}
    try {
      const data = dashboardSalesOverview;
      console.log("Sales Overview Data:", data);
      const first = new Date(data[0].period)
      const last = new Date(data[data.length - 1].period)
      setStartDate(`${first.getDate("YYYY-MM-DD")}/${first.getUTCMonth("YYYY-MM-DD")}/${first.getFullYear()}`)
      setEndDate(`${last.getDate("YYYY-MM-DD")}/${last.getUTCMonth("YYYY-MM-DD")}/${last.getFullYear()}`)
      for (let index = 0; index < data.length; index++) {
        const date = new Date(data[index].period);
        if (selectedFilter === "Daily") {
          const options = { weekday: 'short' };
          const dayOfWeek = date.toLocaleDateString('en-US', options);
          graphOptions[dayOfWeek] = data[index].totalSales
        } else if (selectedFilter === "Weekly") {
          // const getWeekNumber = (d) => {
          //   const dateCopy = new Date(d.getTime());
          //   dateCopy.setHours(0, 0, 0, 0);
          //   dateCopy.setDate(dateCopy.getDate() + 3 - (dateCopy.getDay() + 6) % 7); 
          //   const week1 = new Date(dateCopy.getFullYear(), 0, 4);
          //   const diff = dateCopy - week1;
          //   const oneDay = 1000 * 60 * 60 * 24;
          //   const weekNumber = Math.ceil(diff / oneDay / 7);
          //   return weekNumber;
          // };

          // const weekNumber = getWeekNumber(date);
          // console.log(weekNumber)
          // graphOptions[`Week ${weekNumber}`]=data.data.data[index].totalSales
          const options = { weekday: 'short' };
          const dayOfWeek = date.toLocaleDateString('en-US', options);
          graphOptions[dayOfWeek] = data[index].totalSales
        } else if (selectedFilter === "Monthly") {
          const options = { month: 'short' };
          const dayOfWeek = date.toLocaleDateString('en-US', options);
          graphOptions[dayOfWeek] = data[index].totalSales
        } else if (selectedFilter === "Yearly") {
          const dayOfWeek = date.getFullYear()
          graphOptions[dayOfWeek] = data[index].totalSales
        }
      }
      setGraphOptions(graphOptions)
    } catch (errors) {
      console.log(errors)
    }
  }

  // useEffect(() => {
  //   const fetchSummaryData = async () => {
  //     try {
  //       const data = await getDashboardSummary()
  //       setLoading(false)
  //       setData(data.data.data)
  //       return data
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchSummaryData()
  // }, [])

  useEffect(() => {
    fetchSalesOverview();
  }, [selectedFilter])

  const summaryBoxes = [
    {
      icon: <StackIcon size={22} color="#FB5183" />,
      value: `${dashboardSummary.totalProducts}`,
      label: "Total Products",
    },
    {
      icon: <BagIcon size={22} color="#FB5183" />,
      value: `${dashboardSummary.totalOrders}`,
      label: "Total Order",
    },
    {
      icon: <CardIcon size={22} color="#FB5183" />,
      value: `${dashboardSummary.payout}`,
      label: "Payout",
    },
  ];

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <DashboardLayout>
          <DashboardWrapper>
            <FlexibleDiv className="summary__wrapper">
              {summaryBoxes.map((sgn, idx) => (
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
                  <p>
                    {startDate} - {endDate}
                  </p>
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
                        selectedFilter === sgn
                          ? "var(--oosriPrimary)"
                          : "#F5F5F5"
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
                <AreaChart data={graphOptions} empty={"loading..."} />
              </FlexibleDiv>
            </FlexibleDiv>
            {/* Table Section */}
            <FlexibleDiv
              className="table__section"
              justifyContent="space-around"
            >
              <FlexibleDiv
                flexDir="row"
                width="100%"
                justifyContent="space-between"
                padding="0 30px"
                className="top__recent__box"
              >
                <p className="recent__text">RECENT SALE</p>
                <Link className="see__all__text" href={"/order"}>
                  See All
                </Link>
              </FlexibleDiv>
              <FlexibleDiv className="recent__sale__wrapper">
                <Table
                  columns={dashboardTableColumns}
                  dataSource={dashboardTableData}
                  className="table__class"
                />
              </FlexibleDiv>
            </FlexibleDiv>
          </DashboardWrapper>
        </DashboardLayout>
      )}
    </>
  );
}

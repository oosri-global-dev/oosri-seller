import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { DashboardWrapper } from "./dashboard.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { summaryBoxes } from "@/utils/dashboard-helpers";
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
import { getDashboardSummary } from "@/network/dashboard";

export default function DashboardScreen() {
  const [filters, setFilters] = useState([
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
  ]);
  const [selectedFilter, setSelectedFilter] = useState("Daily");


  useEffect(()=>{
    const fetchSummaryData = async()=>{
      const data= await getDashboardSummary()
       return data
    }
    fetchSummaryData()
  },[])

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

  return (
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
        {/* Table Section */}
        <FlexibleDiv className="table__section" justifyContent="space-around">
          <FlexibleDiv
            flexDir="row"
            width="100%"
            justifyContent="space-between"
            padding="0 30px"
            className="top__recent__box"
          >
            <p className="recent__text">RECENT SALE</p>
            <Link className="see__all__text" href={"/order-history"}>
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
  );
}

import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { DashboardWrapper } from "./dashboard.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Button from "@/components/lib/Button";
import React, { useEffect, useState, useMemo } from "react";
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
import dayjs from "dayjs";

const GRAPH_FILTERS = ["Daily", "Weekly", "Monthly", "Yearly"];

export default function DashboardScreen() {
  const [selectedFilter, setSelectedFilter] = useState("Daily");
  const { data, isLoading } = useDashboardData(selectedFilter.toLowerCase());

  const dashboardSummary = data?.overview?.data?.data || {};
  const dashboardSalesOverview = data?.summary?.data?.data || [];

  const { graphOptions, startDate, endDate } = useMemo(() => {
    if (!dashboardSalesOverview.length) {
      return { graphOptions: {}, startDate: "", endDate: "" };
    }

    const options = {};
    const first = dayjs(dashboardSalesOverview[0].period);
    const last = dayjs(dashboardSalesOverview[dashboardSalesOverview.length - 1].period);

    dashboardSalesOverview.forEach((item) => {
      const date = dayjs(item.period);
      let label;
      switch (selectedFilter) {
        case "Daily":
          label = date.format("ddd");
          break;
        case "Weekly":
          label = date.format("ddd"); // Same as daily in original logic
          break;
        case "Monthly":
          label = date.format("MMM");
          break;
        case "Yearly":
          label = date.format("YYYY");
          break;
        default:
          label = date.format("YYYY-MM-DD");
      }
      options[label] = item.totalSales;
    });

    return {
      graphOptions: options,
      startDate: first.format("DD/MM/YYYY"),
      endDate: last.format("DD/MM/YYYY"),
    };
  }, [dashboardSalesOverview, selectedFilter]);

  const summaryBoxes = useMemo(() => [
    {
      icon: <StackIcon size={22} color="#FB5183" />,
      value: `${dashboardSummary.totalProducts || 0}`,
      label: "Total Products",
    },
    {
      icon: <BagIcon size={22} color="#FB5183" />,
      value: `${dashboardSummary.totalOrders || 0}`,
      label: "Total Order",
    },
    {
      icon: <CardIcon size={22} color="#FB5183" />,
      value: `${dashboardSummary.payout || 0}`,
      label: "Payout",
    },
  ], [dashboardSummary]);

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
                  {GRAPH_FILTERS.map((sgn, idx) => (
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

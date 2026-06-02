import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { DashboardWrapper } from "./dashboard.styles";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";

const AreaChart = dynamic(
  () => import("chartkick/chart.js").then(() => import("react-chartkick")).then((m) => m.AreaChart),
  { ssr: false, loading: () => <div style={{ height: 200 }} /> }
);
import { Table } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import CustomLoader from "@/components/lib/CustomLoader";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useOrders } from "@/hooks/useOrders";

import {
  FiTrendingUp,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiPackage,
  FiBarChart2,
} from "react-icons/fi";

const FILTERS = ["Daily", "Weekly", "Monthly", "Yearly"];

const fmtCompact = (n) => {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000)     return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
};

const fmtCurrency = (n) => `₦${fmtCompact(n)}`;

const STATUS_STYLES = {
  "delivered":       { bg: "#f0fdf4", color: "#16a34a", border: "#86efac" },
  "pending":         { bg: "#fffbeb", color: "#d97706", border: "#fcd34d" },
  "sent for pickup": { bg: "#eff6ff", color: "#2563eb", border: "#93c5fd" },
  "cancelled":       { bg: "#fef2f2", color: "#dc2626", border: "#fca5a5" },
};

const StatusBadge = ({ status }) => {
  const key = status?.toLowerCase() || "";
  const s   = STATUS_STYLES[key] || { bg: "#f5f5f5", color: "#777", border: "#e0e0e0" };
  return (
    <span style={{
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
      padding: "3px 10px", borderRadius: 20,
      fontSize: "0.76rem", fontWeight: 600, whiteSpace: "nowrap",
    }}>
      {status || "—"}
    </span>
  );
};

const recentOrderColumns = [
  {
    title: "Order",
    dataIndex: "orderId",
    key: "orderId",
    render: (id, row) => (
      <div>
        <p style={{ fontWeight: 600, margin: 0, fontSize: "0.88rem" }}>{id}</p>
        <p style={{ color: "#bbb", margin: 0, fontSize: "0.75rem" }}>
          {row.itemNum} item{row.itemNum !== 1 ? "s" : ""}
        </p>
      </div>
    ),
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (name) => <span style={{ fontSize: "0.88rem" }}>{name}</span>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (val) => (
      <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>
        ₦{Number(val).toLocaleString()}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (val) => (
      <span style={{ color: "#aaa", fontSize: "0.82rem" }}>
        {val ? dayjs(val).format("MMM D, YYYY") : "—"}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <StatusBadge status={status} />,
  },
  {
    title: "",
    key: "action",
    render: (_, row) => (
      <Link
        href={`/order/${row.id}`}
        style={{
          color: "var(--oosriPrimary)", fontSize: "0.82rem",
          fontWeight: 600, textDecoration: "none",
        }}
      >
        View →
      </Link>
    ),
  },
];

export default function DashboardScreen() {
  const [selectedFilter, setSelectedFilter] = useState("Daily");
  const { data, isLoading }                 = useDashboardData(selectedFilter.toLowerCase());
  const { data: ordersData, isLoading: ordersLoading } = useOrders();

  const dashboardSummary       = data?.overview?.data?.data || {};
  const dashboardSalesOverview = data?.summary?.data?.data  || [];

  /* chart */
  const { graphOptions, startDate, endDate } = useMemo(() => {
    if (!dashboardSalesOverview.length)
      return { graphOptions: {}, startDate: "", endDate: "" };

    const options = {};
    const first   = dayjs(dashboardSalesOverview[0].period);
    const last    = dayjs(dashboardSalesOverview[dashboardSalesOverview.length - 1].period);

    dashboardSalesOverview.forEach((item) => {
      const date = dayjs(item.period);
      const label =
        selectedFilter === "Monthly" ? date.format("MMM")  :
        selectedFilter === "Yearly"  ? date.format("YYYY") :
        date.format("ddd");
      options[label] = item.totalSales;
    });

    return {
      graphOptions: options,
      startDate: first.format("MMM D, YYYY"),
      endDate:   last.format("MMM D, YYYY"),
    };
  }, [dashboardSalesOverview, selectedFilter]);

  /* KPI cards */
  const kpiCards = useMemo(() => {
    const totalProducts  = dashboardSummary.totalProducts  || 0;
    const totalOrders    = dashboardSummary.totalOrders    || 0;
    const payout         = dashboardSummary.payout         || 0;
    const orders         = ordersData?.data?.data          || [];
    const pendingCount   = dashboardSummary.pendingOrders  ||
      orders.filter(o => o.orderStatus?.toLowerCase() === "pending").length;
    const deliveredCount = dashboardSummary.deliveredOrders ||
      orders.filter(o => o.orderStatus?.toLowerCase() === "delivered").length;
    const avgOrderValue  = totalOrders > 0 ? Math.round(payout / totalOrders) : 0;

    return [
      { label: "Total Revenue",    value: fmtCurrency(payout),         icon: FiTrendingUp,  accent: "#10b981", bg: "rgba(16,185,129,0.1)"  },
      { label: "Total Orders",     value: fmtCompact(totalOrders),     icon: FiShoppingBag, accent: "#3b82f6", bg: "rgba(59,130,246,0.1)"  },
      { label: "Pending Orders",   value: fmtCompact(pendingCount),    icon: FiClock,       accent: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
      { label: "Delivered",        value: fmtCompact(deliveredCount),  icon: FiCheckCircle, accent: "#22c55e", bg: "rgba(34,197,94,0.1)"   },
      { label: "Total Products",   value: fmtCompact(totalProducts),   icon: FiPackage,     accent: "#8b5cf6", bg: "rgba(139,92,246,0.1)"  },
      { label: "Avg. Order Value", value: fmtCurrency(avgOrderValue),  icon: FiBarChart2,   accent: "#fc5353", bg: "rgba(252,83,83,0.1)"   },
    ];
  }, [dashboardSummary, ordersData]);

  /* recent orders */
  const recentOrders = useMemo(() => {
    const orders = ordersData?.data?.data || [];
    return orders.slice(0, 5).map(order => ({
      key:      order.id,
      id:       order.id,
      orderId:  `#${order.id?.slice(-6)?.toUpperCase() || "------"}`,
      itemNum:  order.products?.length || 0,
      customer: order.userId?.fullName || "N/A",
      amount:   order.totalForSeller  || 0,
      date:     order.orderDate,
      status:   order.orderStatus,
    }));
  }, [ordersData]);

  return (
    <DashboardLayout>
      {isLoading ? (
        <CustomLoader customHeight="calc(100dvh - 130px)" />
      ) : (
        <DashboardWrapper>

          {/* ── KPI Cards ── */}
          <div className="kpi__grid">
            {kpiCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div className="kpi__card" key={idx}>
                  <div className="kpi__top">
                    <div className="kpi__icon__wrap" style={{ background: card.bg }}>
                      <Icon size={17} color={card.accent} />
                    </div>
                    <p className="kpi__label">{card.label}</p>
                  </div>
                  <h2 className="kpi__value">{card.value}</h2>
                </div>
              );
            })}
          </div>

          {/* ── Sales Chart ── */}
          <div className="chart__card">
            <div className="chart__header">
              <div className="chart__title__group">
                <h3>Sales Overview</h3>
                {startDate && endDate && (
                  <p className="chart__date__range">{startDate} — {endDate}</p>
                )}
              </div>
              <div className="chart__filters">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    className={`filter__btn${selectedFilter === f ? " active" : ""}`}
                    onClick={() => setSelectedFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart__body">
              <AreaChart
                data={graphOptions}
                colors={["#fc5353"]}
                library={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: "rgba(0,0,0,0.04)" }, ticks: { color: "#bbb" } },
                  },
                  elements: {
                    line: { tension: 0.4 },
                    point: { radius: 3, hoverRadius: 5 },
                  },
                }}
                empty="No data for this period"
              />
            </div>
          </div>

          {/* ── Recent Orders ── */}
          <div className="recent__card">
            <div className="recent__header">
              <h3>Recent Orders</h3>
              <Link href="/order" className="see__all">See all orders →</Link>
            </div>
            <div className="recent__table__wrap">
              <Table
                columns={recentOrderColumns}
                dataSource={recentOrders}
                loading={ordersLoading}
                pagination={false}
                locale={{ emptyText: "No orders yet" }}
                size="middle"
              />
            </div>
          </div>

        </DashboardWrapper>
      )}
    </DashboardLayout>
  );
}

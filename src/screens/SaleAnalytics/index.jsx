import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { SaleAnalyticsWrapper } from "./index.styles";
import { useState, useMemo } from "react";
import { Table } from "antd";
import { useRouter } from "next/router";
import { useOrders } from "@/hooks/useOrders";
import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview, getDashboardSummary } from "@/network/dashboard";
import SalesChart from "./sales-chart";
import PurchasingChart from "./purchasing-chart";
import dayjs from "dayjs";
import {
  IoBagOutline as BagIcon,
  IoPersonOutline as PersonIcon,
} from "react-icons/io5";
import { HiOutlineCurrencyDollar as RevenueIcon } from "react-icons/hi2";
import { VscGraph as TrendIcon } from "react-icons/vsc";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getOptimizedCloudinaryUrl } from "@/utils/cloudinary-helper";

const PERIODS = ["Daily", "Weekly", "Monthly", "Yearly"];
const PERIOD_MAP = { Daily: "daily", Weekly: "weekly", Monthly: "monthly", Yearly: "yearly" };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getStatusClass = (status = "") => {
  const s = status.toLowerCase();
  if (s === "pending")       return "pending";
  if (s === "processing")    return "processing";
  if (s.includes("pickup"))  return "pickup";
  if (s === "delivered")     return "delivered";
  if (s === "cancelled")     return "cancelled";
  return "default";
};

export default function SaleAnalytics() {
  const [period, setPeriod] = useState("Monthly");
  const { data: ordersData, isLoading: ordersLoading } = useOrders();
  const { push } = useRouter();
  const orders = useMemo(() => ordersData?.data?.data || [], [ordersData]);

  /* ── KPI summary from backend ── */
  const { data: summaryData, isLoading: summaryLoading } = useQuery({
    queryKey: ["seller-dashboard-summary"],
    queryFn: getDashboardSummary,
    staleTime: 1000 * 60 * 2,
  });
  const summary = summaryData?.data?.data || summaryData?.data || {};

  /* ── Period-sensitive revenue chart from backend ── */
  const apiPeriod = PERIOD_MAP[period];
  const { data: overviewData, isLoading: overviewLoading } = useQuery({
    queryKey: ["seller-dashboard-overview", apiPeriod],
    queryFn: () => getDashboardOverview(apiPeriod),
    staleTime: 1000 * 60 * 2,
  });

  /* ── Shape chart data per period ── */
  const chartData = useMemo(() => {
    const raw = overviewData?.data?.data || [];
    if (!raw.length) return { labels: [], values: [] };

    if (apiPeriod === "monthly") {
      const labels = MONTHS;
      const values = Array(12).fill(0);
      raw.forEach((d) => {
        const month = parseInt(d.period?.split("-")[1], 10) - 1;
        if (month >= 0 && month <= 11) values[month] = d.totalSales || 0;
      });
      return { labels, values };
    }

    if (apiPeriod === "daily") {
      return { labels: ["Today"], values: [raw[0]?.totalSales || 0] };
    }

    if (apiPeriod === "weekly") {
      const labels = raw.map((d) => dayjs(d.period).format("ddd D"));
      const values = raw.map((d) => d.totalSales || 0);
      return { labels, values };
    }

    if (apiPeriod === "yearly") {
      const labels = raw.map((d) => d.period);
      const values = raw.map((d) => d.totalSales || 0);
      return { labels, values };
    }

    return { labels: [], values: [] };
  }, [overviewData, apiPeriod]);

  const isChartLoading = overviewLoading;

  /* ── KPI metrics (backend summary preferred; fallback to local orders) ── */
  const localRevenue = useMemo(() => orders.reduce((s, o) => s + (o.totalForSeller || 0), 0), [orders]);
  const uniqueCustomers = useMemo(() => new Set(orders.map((o) => o.userId?._id).filter(Boolean)).size, [orders]);
  const totalRevenue = summary.totalSales ?? localRevenue;
  const totalOrders  = summary.totalOrders ?? orders.length;
  const avgOrder     = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  /* ── Top / least selling products ── */
  const { topProduct, leastProduct } = useMemo(() => {
    const freq = {};
    orders.forEach((o) => {
      o.products?.forEach((p) => {
        const k = p.productName;
        if (!k) return;
        if (!freq[k]) freq[k] = { count: 0, revenue: 0, image: p.images?.[0] || null };
        freq[k].count   += 1;
        freq[k].revenue += p.totalPrice || 0;
      });
    });
    const entries = Object.entries(freq).sort((a, b) => b[1].count - a[1].count);
    return {
      topProduct:   entries[0]   ? { name: entries[0][0],   ...entries[0][1] }   : null,
      leastProduct: entries.at(-1) ? { name: entries.at(-1)[0], ...entries.at(-1)[1] } : null,
    };
  }, [orders]);

  /* ── Recent 5 orders for the table ── */
  const recentOrders = useMemo(() =>
    [...orders]
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 5)
      .map((o) => ({
        key: o.id,
        id: o.id,
        orderId: `#${o.id?.slice(-6).toUpperCase()}`,
        customer: o.userId?.fullName || "N/A",
        amount: o.totalForSeller,
        date: o.orderDate,
        status: o.orderStatus,
      })),
    [orders]
  );

  const recentColumns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (_) => (
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.84rem" }}>{_}</span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_) => <span style={{ fontWeight: 500 }}>{_}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_) => (
        <span style={{ fontWeight: 700 }}>₦{Number(_ || 0).toLocaleString()}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_) => (
        <span style={{ color: "#888", fontSize: "0.82rem" }}>
          {_ ? dayjs(_).format("MMM D, YYYY") : "—"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_) => (
        <span className={`status__badge ${getStatusClass(_)}`}>{_ || "—"}</span>
      ),
    },
  ];

  const kpis = [
    {
      icon: <RevenueIcon size={18} />,
      value: `₦${totalRevenue >= 1000000
        ? `${(totalRevenue / 1000000).toFixed(1)}M`
        : totalRevenue >= 1000
        ? `${(totalRevenue / 1000).toFixed(0)}K`
        : totalRevenue.toLocaleString()}`,
      label: "Total Revenue",
    },
    {
      icon: <BagIcon size={18} />,
      value: totalOrders.toLocaleString(),
      label: "Total Orders",
    },
    {
      icon: <PersonIcon size={18} />,
      value: uniqueCustomers.toLocaleString(),
      label: "Unique Customers",
    },
    {
      icon: <TrendIcon size={18} />,
      value: `₦${avgOrder >= 1000
        ? `${(avgOrder / 1000).toFixed(0)}K`
        : avgOrder.toFixed(0)}`,
      label: "Avg Order Value",
    },
  ];

  return (
    <DashboardLayout title="Analytics">
      <SaleAnalyticsWrapper>

        {/* ── KPI cards ── */}
        <div className="kpi__grid">
          {kpis.map((k, i) => (
            <div className="kpi__card" key={i}>
              <div className="kpi__top">
                <div className="kpi__icon">{k.icon}</div>
              </div>
              <div className="kpi__value">{summaryLoading ? "—" : k.value}</div>
              <div className="kpi__label">{k.label}</div>
            </div>
          ))}
        </div>

        {/* ── Revenue chart ── */}
        <div className="chart__card">
          <div className="chart__header">
            <div className="chart__title">
              <h3>Revenue Overview</h3>
              <p>
                {period === "Monthly" && `Monthly revenue for ${new Date().getFullYear()}`}
                {period === "Daily"   && "Today's revenue"}
                {period === "Weekly"  && "Last 7 days"}
                {period === "Yearly"  && "Year-on-year revenue"}
              </p>
            </div>
            <div className="period__tabs">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  className={`period__pill${period === p ? " active" : ""}`}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="chart__body">
            {isChartLoading ? (
              <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: "0.85rem" }}>
                Loading…
              </div>
            ) : (
              <SalesChart data={chartData.values} labels={chartData.labels} />
            )}
          </div>
        </div>

        {/* ── Top / Least selling ── */}
        <div className="insights__grid">
          {/* Top selling */}
          <div className="insight__card">
            <div className="insight__header">
              <h3>Top Selling Product</h3>
            </div>
            {topProduct ? (
              <>
                <div className="insight__body">
                  <div className="insight__thumb">
                    {topProduct.image ? (
                      <img
                        src={getOptimizedCloudinaryUrl(topProduct.image, 120)}
                        alt={topProduct.name}
                      />
                    ) : (
                      <span className="thumb__placeholder">
                        {topProduct.name?.[0]?.toUpperCase() || "P"}
                      </span>
                    )}
                  </div>
                  <div className="insight__info">
                    <p className="insight__name">{topProduct.name}</p>
                    <p className="insight__sub">
                      {topProduct.count} sold · ₦{Number(topProduct.revenue).toLocaleString()}
                    </p>
                  </div>
                  <div className="insight__chart">
                    <PurchasingChart increasing={true} />
                  </div>
                </div>
                <div className="insight__trend up">
                  <FaArrowUp size={10} />
                  Best performer <span>this period</span>
                </div>
              </>
            ) : (
              <div className="insight__empty">No sales data yet</div>
            )}
          </div>

          {/* Least selling */}
          <div className="insight__card">
            <div className="insight__header">
              <h3>Least Sold Product</h3>
            </div>
            {leastProduct && leastProduct.name !== topProduct?.name ? (
              <>
                <div className="insight__body">
                  <div className="insight__thumb">
                    {leastProduct.image ? (
                      <img
                        src={getOptimizedCloudinaryUrl(leastProduct.image, 120)}
                        alt={leastProduct.name}
                      />
                    ) : (
                      <span className="thumb__placeholder">
                        {leastProduct.name?.[0]?.toUpperCase() || "P"}
                      </span>
                    )}
                  </div>
                  <div className="insight__info">
                    <p className="insight__name">{leastProduct.name}</p>
                    <p className="insight__sub">
                      {leastProduct.count} sold · ₦{Number(leastProduct.revenue).toLocaleString()}
                    </p>
                  </div>
                  <div className="insight__chart">
                    <PurchasingChart increasing={false} />
                  </div>
                </div>
                <div className="insight__trend down">
                  <FaArrowDown size={10} />
                  Needs attention <span>this period</span>
                </div>
              </>
            ) : (
              <div className="insight__empty">No sales data yet</div>
            )}
          </div>
        </div>

        {/* ── Recent orders table ── */}
        <div className="orders__card">
          <div className="orders__header">
            <h3>Recent Orders</h3>
            <button className="see__all" onClick={() => push("/order")}>
              See all →
            </button>
          </div>
          <Table
            columns={recentColumns}
            dataSource={recentOrders}
            loading={ordersLoading}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => push(`/order/${record.id}`),
              style: { cursor: "pointer" },
            })}
            pagination={false}
            locale={{
              emptyText: (
                <div style={{ padding: "32px", textAlign: "center", color: "#ccc" }}>
                  No orders yet
                </div>
              ),
            }}
          />
        </div>

      </SaleAnalyticsWrapper>
    </DashboardLayout>
  );
}

import { useMemo } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { useOrders } from "@/hooks/useOrders";
import { useMainContext } from "@/context";
import styled from "styled-components";
import { Table } from "antd";
import dayjs from "dayjs";
import {
  HiOutlineCurrencyDollar as RevenueIcon,
  HiOutlineClock as PendingIcon,
  HiOutlineCheckCircle as PaidIcon,
  HiOutlineBanknotes as BankIcon,
} from "react-icons/hi2";
import { MdOutlineInfo as InfoIcon } from "react-icons/md";

const PayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  /* ── Summary cards ── */
  .kpi__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @media (max-width: 860px) { grid-template-columns: 1fr 1fr; }
    @media (max-width: 480px) { grid-template-columns: 1fr; }
  }

  .kpi__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);

    .kpi__icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;

      &.green  { background: #f0fdf4; color: #16a34a; }
      &.amber  { background: #fffbeb; color: #d97706; }
      &.blue   { background: #eff6ff; color: #3b82f6; }
      &.purple { background: #faf5ff; color: #7c3aed; }
    }

    .kpi__value {
      font-size: 1.5rem;
      font-weight: 800;
      color: #111;
      letter-spacing: -0.5px;
      line-height: 1;
    }

    .kpi__label {
      font-size: 0.78rem;
      color: #888;
      font-weight: 500;
    }
  }

  /* ── Bank account card ── */
  .bank__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    flex-wrap: wrap;

    .bank__left {
      display: flex;
      align-items: center;
      gap: 14px;

      .bank__icon {
        width: 42px;
        height: 42px;
        border-radius: 10px;
        background: #f0fdf4;
        color: #16a34a;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .bank__info {
        .bank__name  { font-size: 0.95rem; font-weight: 700; color: #111; margin: 0 0 2px; }
        .bank__acct  { font-size: 0.82rem; color: #888; margin: 0; }
      }
    }

    .bank__badge {
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      background: #f0fdf4;
      color: #16a34a;
      border: 1px solid #86efac;
    }

    .bank__unset {
      font-size: 0.84rem;
      color: #aaa;
    }
  }

  /* ── Info banner ── */
  .info__banner {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.83rem;
    color: #1e40af;
    line-height: 1.55;

    .info__icon { flex-shrink: 0; margin-top: 1px; color: #3b82f6; }
  }

  /* ── Table card ── */
  .table__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);

    .table__header {
      padding: 18px 24px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 { font-size: 0.95rem; font-weight: 700; color: #111; margin: 0; }
      span { font-size: 0.78rem; color: #aaa; }
    }

    .ant-table-thead > tr > th {
      background: #fafafa !important;
      font-size: 0.72rem;
      font-weight: 700;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #f0f0f0 !important;
      padding: 12px 20px;
    }

    .ant-table-tbody > tr > td {
      padding: 14px 20px;
      border-bottom: 1px solid #f8f8f8 !important;
      vertical-align: middle;
    }

    .ant-table-tbody > tr:last-child > td { border-bottom: none !important; }
    .ant-table-tbody > tr:hover > td      { background: #fafafa !important; }
    .ant-pagination { padding: 12px 20px; margin: 0 !important; }
  }

  /* ── Status badges ── */
  .payout__badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    white-space: nowrap;
    text-transform: capitalize;

    &::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
    }

    &.eligible  { background: #f0fdf4; color: #16a34a; border: 1px solid #86efac; }
    &.pending   { background: #fffbeb; color: #d97706; border: 1px solid #fcd34d; }
    &.processing{ background: #eff6ff; color: #3b82f6; border: 1px solid #93c5fd; }
    &.cancelled { background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; }
  }

  .amount__cell   { font-size: 0.9rem; font-weight: 700; color: #111; }
  .payout__cell   { font-size: 0.9rem; font-weight: 700; color: #16a34a; }
  .customer__cell { font-size: 0.86rem; font-weight: 500; color: #333; }
  .date__cell     { font-size: 0.82rem; color: #888; }
  .order__code    {
    font-family: ui-monospace, "SF Mono", monospace;
    font-size: 0.84rem;
    font-weight: 700;
    color: #111;
  }
`;

const getPayoutStatus = (order) => {
  const s = order.orderStatus?.toLowerCase() || "";
  if (s === "delivered" || s === "completed") return "eligible";
  if (s === "cancelled")                      return "cancelled";
  if (s === "processing")                     return "processing";
  return "pending";
};

export default function PayoutsScreen() {
  const { data, isLoading } = useOrders();
  const { state: { user } } = useMainContext();
  const orders = useMemo(() => data?.data?.data || [], [data]);

  // Compute order total and 85% seller payout from the product line items
  const getOrderSubtotal = (o) =>
    o.products?.reduce((s, p) => s + (p.totalPrice || 0), 0) || o.totalAmount || 0;
  const getSellerPayout  = (o) => Number((getOrderSubtotal(o) * 0.85).toFixed(2));

  const totalEarned   = useMemo(() =>
    orders.filter((o) => ["delivered", "completed"].includes(o.orderStatus?.toLowerCase()))
          .reduce((s, o) => s + getSellerPayout(o), 0), [orders]);

  const pendingPayout = useMemo(() =>
    orders.filter((o) => !["delivered", "completed", "cancelled"].includes(o.orderStatus?.toLowerCase()))
          .reduce((s, o) => s + getSellerPayout(o), 0), [orders]);

  const totalOrders   = orders.length;
  const deliveredCount = orders.filter((o) =>
    ["delivered", "completed"].includes(o.orderStatus?.toLowerCase())).length;

  const bankDetails = user?.bankDetails;
  const hasBankDetails = bankDetails?.bank && bankDetails?.accountNumber;

  const kpis = [
    { icon: <RevenueIcon size={18} />, color: "green",  label: "Eligible Payout", value: `₦${totalEarned >= 1e6 ? `${(totalEarned/1e6).toFixed(1)}M` : totalEarned >= 1000 ? `${(totalEarned/1000).toFixed(0)}K` : totalEarned.toLocaleString()}` },
    { icon: <PendingIcon size={18} />, color: "amber",  label: "Pending Payout",  value: `₦${pendingPayout >= 1000 ? `${(pendingPayout/1000).toFixed(0)}K` : pendingPayout.toLocaleString()}` },
    { icon: <PaidIcon size={18} />,    color: "blue",   label: "Delivered Orders",value: deliveredCount },
    { icon: <BankIcon size={18} />,    color: "purple", label: "Total Orders",    value: totalOrders },
  ];

  const tableData = useMemo(() =>
    [...orders]
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .map((o) => {
        const orderTotal = getOrderSubtotal(o);
        return {
          key:         o.id,
          id:          o.id,
          orderId:     `#${o.id?.slice(-6).toUpperCase()}`,
          customer:    o.userId?.fullName || "N/A",
          orderTotal,
          payout:      Number((orderTotal * 0.85).toFixed(2)),
          date:        o.orderDate,
          status:      getPayoutStatus(o),
          orderStatus: o.orderStatus,
        };
      }),
    [orders]
  );

  const columns = [
    {
      title: "Order",
      dataIndex: "orderId",
      key: "orderId",
      render: (val) => <span className="order__code">{val}</span>,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (val) => <span className="customer__cell">{val}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (val) => (
        <span className="date__cell">{val ? dayjs(val).format("MMM D, YYYY") : "—"}</span>
      ),
    },
    {
      title: "Order Total",
      dataIndex: "orderTotal",
      key: "orderTotal",
      render: (val) => <span className="amount__cell">₦{Number(val).toLocaleString()}</span>,
      sorter: (a, b) => a.orderTotal - b.orderTotal,
    },
    {
      title: "Your Payout (85%)",
      dataIndex: "payout",
      key: "payout",
      render: (val) => <span className="payout__cell">₦{Number(val).toLocaleString()}</span>,
      sorter: (a, b) => a.payout - b.payout,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <span className={`payout__badge ${val}`}>
          {val === "eligible" ? "Payout Eligible" : val === "pending" ? "Awaiting Delivery" : val}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout title="Payouts">
      <PayoutWrapper>

        {/* ── KPI summary ── */}
        <div className="kpi__grid">
          {kpis.map((k, i) => (
            <div key={i} className="kpi__card">
              <div className={`kpi__icon ${k.color}`}>{k.icon}</div>
              <div className="kpi__value">{isLoading ? "—" : k.value}</div>
              <div className="kpi__label">{k.label}</div>
            </div>
          ))}
        </div>

        {/* ── Bank account ── */}
        <div className="bank__card">
          <div className="bank__left">
            <div className="bank__icon"><BankIcon size={20} /></div>
            {hasBankDetails ? (
              <div className="bank__info">
                <p className="bank__name">{bankDetails.bank}</p>
                <p className="bank__acct">
                  {bankDetails.accountName && `${bankDetails.accountName} · `}
                  {bankDetails.accountNumber}
                </p>
              </div>
            ) : (
              <span className="bank__unset">No bank account linked</span>
            )}
          </div>
          {hasBankDetails ? (
            <span className="bank__badge">Payout Account</span>
          ) : (
            <a href="/sellers-profile-page" style={{ fontSize: "0.84rem", color: "var(--oosriPrimary)", fontWeight: 600 }}>
              Add bank details →
            </a>
          )}
        </div>

        {/* ── Info note ── */}
        <div className="info__banner">
          <InfoIcon size={15} className="info__icon" />
          <span>
            Payouts are triggered after delivery confirmation. Oosri takes a <strong>15% platform fee</strong> per sale.
            Transfers reach your bank within <strong>3–5 business days</strong>.
          </span>
        </div>

        {/* ── Payout table ── */}
        <div className="table__card">
          <div className="table__header">
            <h3>Payout History</h3>
            <span>{tableData.length} order{tableData.length !== 1 ? "s" : ""}</span>
          </div>
          <Table
            columns={columns}
            dataSource={tableData}
            loading={isLoading}
            rowKey="id"
            pagination={{
              pageSize: 15,
              showSizeChanger: false,
              showTotal: (total) => `${total} records`,
            }}
            locale={{
              emptyText: (
                <div style={{ padding: "40px 24px", textAlign: "center", color: "#ccc" }}>
                  <p style={{ fontWeight: 600, color: "#888", margin: "0 0 4px" }}>No payout history yet</p>
                  <p style={{ fontSize: "0.82rem", margin: 0 }}>Payouts will appear here once you receive orders</p>
                </div>
              ),
            }}
          />
        </div>

      </PayoutWrapper>
    </DashboardLayout>
  );
}

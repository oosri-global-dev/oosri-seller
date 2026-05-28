import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { ReturnsWrapper } from "./index.styles";
import { useState, useMemo } from "react";
import { Table } from "antd";
import { useRouter } from "next/router";
import { useSellerReturns } from "@/hooks/useReturns";
import dayjs from "dayjs";
import { HiOutlineArrowPath as ReturnIcon } from "react-icons/hi2";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";

const STATUS_TABS = [
  { key: "all",              label: "All" },
  { key: "pending",          label: "Pending" },
  { key: "seller_approved",  label: "Approved" },
  { key: "seller_rejected",  label: "Rejected" },
  { key: "escalated",        label: "Escalated" },
  { key: "refunded",         label: "Refunded" },
  { key: "closed",           label: "Closed" },
];

const STATUS_CONFIG = {
  pending:          { label: "Pending Review",    color: "#d97706", bg: "#fffbeb", border: "#fcd34d" },
  seller_approved:  { label: "You Approved",      color: "#16a34a", bg: "#f0fdf4", border: "#86efac" },
  seller_rejected:  { label: "You Rejected",      color: "#dc2626", bg: "#fef2f2", border: "#fca5a5" },
  escalated:        { label: "Escalated to Admin",color: "#9333ea", bg: "#faf5ff", border: "#d8b4fe" },
  admin_approved:   { label: "Admin Approved",    color: "#2563eb", bg: "#eff6ff", border: "#93c5fd" },
  admin_rejected:   { label: "Admin Rejected",    color: "#dc2626", bg: "#fef2f2", border: "#fca5a5" },
  refund_initiated: { label: "Refund Initiated",  color: "#0891b2", bg: "#ecfeff", border: "#67e8f9" },
  refunded:         { label: "Refunded",          color: "#16a34a", bg: "#f0fdf4", border: "#86efac" },
  closed:           { label: "Closed",            color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb" },
};

const REASON_LABELS = {
  defective:        "Defective",
  wrong_item:       "Wrong Item",
  not_as_described: "Not as Described",
  damaged:          "Damaged",
  other:            "Other",
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { label: status, color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap",
      fontSize: "0.72rem", fontWeight: 700,
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}

export default function ReturnsScreen() {
  const { push } = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch]       = useState("");

  const { data, isLoading } = useSellerReturns();
  const allReturns = useMemo(() => data?.body?.returns || [], [data]);

  const filtered = useMemo(() => {
    let list = allReturns;
    if (activeTab !== "all") {
      list = list.filter((r) => r.status === activeTab);
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter((r) => {
        const buyer    = r.buyerId?.fullName?.toLowerCase() || "";
        const orderId  = String(r.orderId?._id || r.orderId || "").toLowerCase();
        const reason   = (REASON_LABELS[r.reason] || r.reason || "").toLowerCase();
        return buyer.includes(term) || orderId.includes(term) || reason.includes(term);
      });
    }
    return list;
  }, [allReturns, activeTab, search]);

  const pendingCount = useMemo(() => allReturns.filter((r) => r.status === "pending").length, [allReturns]);

  const columns = [
    {
      title: "Return ID",
      dataIndex: "_id",
      key: "_id",
      render: (val) => (
        <span className="mono__id">#{String(val).slice(-8).toUpperCase()}</span>
      ),
    },
    {
      title: "Buyer",
      dataIndex: "buyerId",
      key: "buyer",
      render: (buyer) => (
        <span className="buyer__name">{buyer?.fullName || "—"}</span>
      ),
    },
    {
      title: "Order",
      dataIndex: "orderId",
      key: "order",
      render: (order) => (
        <span className="mono__id">#{String(order?._id || order || "").slice(-6).toUpperCase()}</span>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (r) => (
        <span className="reason__cell">{REASON_LABELS[r] || r}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (d) => (
        <span className="date__cell">{d ? dayjs(d).format("MMM D, YYYY") : "—"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) => <StatusBadge status={s} />,
    },
    {
      title: "",
      key: "action",
      render: (_, row) => (
        <button
          className="view__btn"
          onClick={(e) => { e.stopPropagation(); push(`/returns/${row._id || row.id}`); }}
        >
          Review →
        </button>
      ),
    },
  ];

  return (
    <DashboardLayout title="Returns">
      <ReturnsWrapper>

        {/* ── Summary strip ── */}
        <div className="summary__strip">
          <div className="strip__item">
            <span className="strip__num">{allReturns.length}</span>
            <span className="strip__label">Total Returns</span>
          </div>
          <div className="strip__divider" />
          <div className="strip__item">
            <span className="strip__num pending">{pendingCount}</span>
            <span className="strip__label">Awaiting Review</span>
          </div>
          <div className="strip__divider" />
          <div className="strip__item">
            <span className="strip__num green">
              {allReturns.filter((r) => ["seller_approved", "admin_approved", "refunded"].includes(r.status)).length}
            </span>
            <span className="strip__label">Approved</span>
          </div>
          <div className="strip__divider" />
          <div className="strip__item">
            <span className="strip__num red">
              {allReturns.filter((r) => ["seller_rejected", "escalated", "admin_rejected"].includes(r.status)).length}
            </span>
            <span className="strip__label">Rejected</span>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="toolbar">
          <div className="search__wrap">
            <SearchIcon size={14} className="search__icon" />
            <input
              className="search__input"
              placeholder="Search by buyer, order, reason…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="tab__row">
            {STATUS_TABS.map((t) => {
              const count = t.key === "all"
                ? allReturns.length
                : allReturns.filter((r) => r.status === t.key).length;
              return (
                <button
                  key={t.key}
                  className={`tab__pill${activeTab === t.key ? " active" : ""}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label}
                  {count > 0 && <span className="tab__count">{count}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="table__card">
          <Table
            columns={columns}
            dataSource={filtered}
            rowKey={(r) => String(r._id || r.id)}
            loading={isLoading}
            pagination={{ pageSize: 15, showSizeChanger: false }}
            onRow={(row) => ({
              onClick: () => push(`/returns/${row._id || row.id}`),
              style: { cursor: "pointer" },
            })}
            locale={{
              emptyText: (
                <div className="empty__state">
                  <ReturnIcon size={32} />
                  <p className="empty__title">No return requests yet</p>
                  <p className="empty__sub">When buyers submit return requests for your orders, they will appear here.</p>
                </div>
              ),
            }}
          />
        </div>

      </ReturnsWrapper>
    </DashboardLayout>
  );
}

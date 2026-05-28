import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { ReturnDetailWrapper } from "./index.styles";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSellerReturnById, useReturnActions } from "@/hooks/useReturns";
import dayjs from "dayjs";
import { Modal, Input } from "antd";
import {
  HiOutlineCheckCircle as ApproveIcon,
  HiOutlineXCircle    as RejectIcon,
  HiOutlineClock      as PendingIcon,
  HiOutlineUser       as BuyerIcon,
  HiOutlineShoppingBag as OrderIcon,
  HiOutlineDocumentText as ReasonIcon,
  HiOutlineChatBubbleBottomCenterText as NoteIcon,
} from "react-icons/hi2";
import { BsArrowLeft } from "react-icons/bs";

const STATUS_CONFIG = {
  pending:          { label: "Awaiting Your Review",  color: "#d97706", bg: "#fffbeb", border: "#fcd34d", Icon: PendingIcon },
  seller_approved:  { label: "You Approved",          color: "#16a34a", bg: "#f0fdf4", border: "#86efac", Icon: ApproveIcon },
  seller_rejected:  { label: "You Rejected",          color: "#dc2626", bg: "#fef2f2", border: "#fca5a5", Icon: RejectIcon  },
  escalated:        { label: "Escalated to Admin",    color: "#9333ea", bg: "#faf5ff", border: "#d8b4fe", Icon: PendingIcon },
  admin_approved:   { label: "Approved by Admin",     color: "#2563eb", bg: "#eff6ff", border: "#93c5fd", Icon: ApproveIcon },
  admin_rejected:   { label: "Rejected by Admin",     color: "#dc2626", bg: "#fef2f2", border: "#fca5a5", Icon: RejectIcon  },
  refund_initiated: { label: "Refund Initiated",      color: "#0891b2", bg: "#ecfeff", border: "#67e8f9", Icon: PendingIcon },
  refunded:         { label: "Refunded",              color: "#16a34a", bg: "#f0fdf4", border: "#86efac", Icon: ApproveIcon },
  closed:           { label: "Closed",                color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb", Icon: RejectIcon  },
};

const REASON_LABELS = {
  defective:        "Defective product",
  wrong_item:       "Wrong item sent",
  not_as_described: "Not as described",
  damaged:          "Arrived damaged",
  other:            "Other reason",
};

const ACTOR_LABELS = { buyer: "Buyer", seller: "You", admin: "Oosri Admin", system: "System" };

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.closed;
  return (
    <span className="status__badge" style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}>
      <span className="dot" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="info__row">
      <div className="info__icon__wrap"><Icon size={14} /></div>
      <div className="info__content">
        <span className="info__label">{label}</span>
        <span className="info__value">{value}</span>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <ReturnDetailWrapper>
      <div className="skeleton__header" />
      <div className="cards__grid">
        <div className="skeleton__card" />
        <div className="skeleton__card" />
      </div>
      <div className="skeleton__card tall" />
    </ReturnDetailWrapper>
  );
}

export default function ReturnDetailScreen({ returnId }) {
  const { back, push }     = useRouter();
  const { data, isLoading } = useSellerReturnById(returnId);
  const { approve, reject } = useReturnActions(returnId);

  const [approveOpen,  setApproveOpen]  = useState(false);
  const [rejectOpen,   setRejectOpen]   = useState(false);
  const [approveNote,  setApproveNote]  = useState("");
  const [rejectNote,   setRejectNote]   = useState("");
  const [noteErr,      setNoteErr]      = useState("");

  if (isLoading) {
    return (
      <DashboardLayout title="Return Detail" showBackBtn>
        <Skeleton />
      </DashboardLayout>
    );
  }

  const ret = data?.body || data?.data || data;
  if (!ret?._id && !ret?.id) {
    return (
      <DashboardLayout title="Return Detail" showBackBtn>
        <div style={{ padding: 40, textAlign: "center", color: "#ccc" }}>Return request not found.</div>
      </DashboardLayout>
    );
  }

  const returnId_ = ret._id || ret.id;
  const cfg        = STATUS_CONFIG[ret.status] || STATUS_CONFIG.closed;
  const canAction  = ret.status === "pending";
  const orderId    = ret.orderId?._id || ret.orderId;
  const orderRef   = `#${String(orderId || "").slice(-6).toUpperCase()}`;
  const returnRef  = `#${String(returnId_).slice(-8).toUpperCase()}`;
  const buyer      = ret.buyerId?.fullName || "Unknown Buyer";
  const buyerEmail = ret.buyerId?.email    || "";

  const handleApprove = () => {
    approve.mutate(approveNote || undefined, {
      onSuccess: () => { setApproveOpen(false); setApproveNote(""); },
    });
  };

  const handleReject = () => {
    if (!rejectNote.trim()) { setNoteErr("Please provide a reason for rejecting this return."); return; }
    setNoteErr("");
    reject.mutate(rejectNote.trim(), {
      onSuccess: () => { setRejectOpen(false); setRejectNote(""); },
    });
  };

  return (
    <DashboardLayout title="Return Detail" showBackBtn>
      <ReturnDetailWrapper>

        {/* ── Page header ── */}
        <div className="page__header">
          <div className="header__left">
            <button className="back__link" onClick={back}>
              <BsArrowLeft size={14} /> Back to Returns
            </button>
            <div className="header__meta">
              <h2 className="return__ref">{returnRef}</h2>
              <StatusBadge status={ret.status} />
            </div>
            <p className="header__date">
              Submitted {ret.createdAt ? dayjs(ret.createdAt).format("MMM D, YYYY [at] h:mm A") : "—"}
            </p>
          </div>

          {canAction && (
            <div className="action__btns">
              <button className="btn__approve" onClick={() => setApproveOpen(true)}>
                <ApproveIcon size={15} /> Approve Return
              </button>
              <button className="btn__reject" onClick={() => setRejectOpen(true)}>
                <RejectIcon size={15} /> Reject Return
              </button>
            </div>
          )}
        </div>

        {/* ── Status banner (post-action) ── */}
        {!canAction && (
          <div className="status__banner" style={{ borderColor: cfg.border, background: cfg.bg, color: cfg.color }}>
            <cfg.Icon size={16} />
            <span>
              {ret.status === "seller_approved"  && "You approved this return. Oosri admin will process the refund."}
              {ret.status === "seller_rejected"  && "You rejected this return. The buyer may escalate to Oosri support."}
              {ret.status === "escalated"        && "This return has been escalated to Oosri admin for review."}
              {ret.status === "admin_approved"   && "Oosri admin has approved this return and will process the refund."}
              {ret.status === "admin_rejected"   && "Oosri admin has closed this return request."}
              {ret.status === "refund_initiated" && "A refund has been initiated to the buyer."}
              {ret.status === "refunded"         && "The buyer has been fully refunded."}
              {ret.status === "closed"           && "This return request has been closed."}
            </span>
          </div>
        )}

        {/* ── Info cards ── */}
        <div className="cards__grid">

          {/* Buyer info */}
          <div className="info__card">
            <h3 className="card__title">Buyer</h3>
            <InfoRow icon={BuyerIcon}  label="Name"  value={buyer} />
            {buyerEmail && <InfoRow icon={BuyerIcon} label="Email" value={buyerEmail} />}
          </div>

          {/* Order info */}
          <div className="info__card">
            <h3 className="card__title">Order</h3>
            <InfoRow icon={OrderIcon} label="Order Ref"   value={orderRef} />
            <InfoRow icon={OrderIcon} label="Order Status" value={ret.orderId?.orderStatus || "—"} />
            {ret.orderId?.orderDate && (
              <InfoRow icon={OrderIcon} label="Order Date" value={dayjs(ret.orderId.orderDate).format("MMM D, YYYY")} />
            )}
            <div className="order__link__row">
              <button className="order__link" onClick={() => push(`/order/${orderId}`)}>
                View Order Details →
              </button>
            </div>
          </div>

        </div>

        {/* ── Return details ── */}
        <div className="info__card">
          <h3 className="card__title">Return Details</h3>
          <div className="details__grid">
            <InfoRow icon={ReasonIcon} label="Reason"     value={REASON_LABELS[ret.reason] || ret.reason} />
            <InfoRow icon={PendingIcon} label="Submitted"  value={ret.createdAt ? dayjs(ret.createdAt).format("MMM D, YYYY") : "—"} />
            {ret.reasonDetail && (
              <div className="detail__description">
                <p className="detail__desc__label">Buyer&rsquo;s Description</p>
                <p className="detail__desc__text">{ret.reasonDetail}</p>
              </div>
            )}
            {ret.sellerNote && (
              <InfoRow icon={NoteIcon} label="Your Note" value={ret.sellerNote} />
            )}
            {ret.adminNote && (
              <InfoRow icon={NoteIcon} label="Admin Note" value={ret.adminNote} />
            )}
          </div>

          {/* Evidence */}
          {ret.evidenceUrls?.length > 0 && (
            <div className="evidence__section">
              <p className="evidence__label">Evidence ({ret.evidenceUrls.length} file{ret.evidenceUrls.length !== 1 ? "s" : ""})</p>
              <div className="evidence__grid">
                {ret.evidenceUrls.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="evidence__thumb">
                    <img src={url} alt={`Evidence ${i + 1}`} onError={(e) => { e.target.style.display = "none"; }} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Timeline ── */}
        {ret.timeline?.length > 0 && (
          <div className="info__card">
            <h3 className="card__title">Activity Timeline</h3>
            <div className="timeline">
              {[...ret.timeline].reverse().map((t, i) => {
                const tlCfg = STATUS_CONFIG[t.status] || { color: "#6b7280" };
                return (
                  <div key={i} className={`timeline__item${i === 0 ? " latest" : ""}`}>
                    <div className="tl__dot" style={{ background: tlCfg.color }} />
                    <div className="tl__body">
                      <div className="tl__top">
                        <span className="tl__actor">{ACTOR_LABELS[t.actorType] || t.actorType}</span>
                        <span className="tl__status" style={{ color: tlCfg.color }}>
                          {STATUS_CONFIG[t.status]?.label || t.status}
                        </span>
                        <span className="tl__time">
                          {t.timestamp ? dayjs(t.timestamp).format("MMM D, h:mm A") : ""}
                        </span>
                      </div>
                      {t.note && <p className="tl__note">{t.note}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </ReturnDetailWrapper>

      {/* ── Approve modal ── */}
      <Modal
        open={approveOpen}
        title="Approve Return Request"
        onCancel={() => { setApproveOpen(false); setApproveNote(""); }}
        onOk={handleApprove}
        okText="Approve"
        okButtonProps={{ loading: approve.isPending, style: { background: "#16a34a", borderColor: "#16a34a" } }}
        cancelButtonProps={{ disabled: approve.isPending }}
      >
        <p style={{ fontSize: ".88rem", color: "#555", marginBottom: 16 }}>
          Approving this return will notify the buyer and send the request to Oosri for refund processing.
          You may optionally include a note.
        </p>
        <Input.TextArea
          rows={3}
          placeholder="Optional note to the buyer…"
          value={approveNote}
          onChange={(e) => setApproveNote(e.target.value)}
          maxLength={500}
          showCount
        />
      </Modal>

      {/* ── Reject modal ── */}
      <Modal
        open={rejectOpen}
        title="Reject Return Request"
        onCancel={() => { setRejectOpen(false); setRejectNote(""); setNoteErr(""); }}
        onOk={handleReject}
        okText="Reject Return"
        okButtonProps={{ loading: reject.isPending, style: { background: "#dc2626", borderColor: "#dc2626" } }}
        cancelButtonProps={{ disabled: reject.isPending }}
      >
        <p style={{ fontSize: ".88rem", color: "#555", marginBottom: 12 }}>
          Please explain why you are rejecting this return. The buyer will see this reason and may escalate to Oosri support.
        </p>
        <Input.TextArea
          rows={4}
          placeholder="Reason for rejection (required)…"
          value={rejectNote}
          onChange={(e) => { setRejectNote(e.target.value); if (noteErr) setNoteErr(""); }}
          maxLength={500}
          showCount
          status={noteErr ? "error" : ""}
        />
        {noteErr && <p style={{ color: "#dc2626", fontSize: ".8rem", marginTop: 6 }}>{noteErr}</p>}
      </Modal>

    </DashboardLayout>
  );
}

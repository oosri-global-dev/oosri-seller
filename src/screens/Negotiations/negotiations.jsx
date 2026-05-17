import React, { useState } from "react";
import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSellerNegotiations,
  counterNegotiation,
  acceptNegotiation,
  rejectNegotiation,
} from "@/network/negotiation";

const Wrapper = styled(FlexibleDiv)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;

  h1 {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
  }

  .filter__row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    button {
      padding: 6px 16px;
      border-radius: 20px;
      border: 1px solid rgba(187, 187, 187, 0.4);
      background: transparent;
      color: #555;
      font-size: 0.82rem;
      cursor: pointer;

      &.active {
        background: var(--orrsiPrimary, #fc5353);
        border-color: var(--orrsiPrimary, #fc5353);
        color: #fff;
        font-weight: 600;
      }
    }
  }

  .empty__msg {
    color: #888;
    font-size: 0.9rem;
    padding: 40px 0;
    width: 100%;
    text-align: center;
  }
`;

const NegCard = styled.div`
  width: 100%;
  border: 1px solid rgba(187, 187, 187, 0.3);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #fff;

  .card__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 8px;

    .product__name {
      font-weight: 700;
      font-size: 1rem;
      margin: 0;
    }

    .status {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: capitalize;

      &.pending { background: #fef9c3; color: #854d0e; }
      &.countered { background: #dbeafe; color: #1e40af; }
      &.accepted { background: #d1fae5; color: #065f46; }
      &.rejected { background: #fee2e2; color: #991b1b; }
      &.expired { background: #f3f4f6; color: #6b7280; }
    }
  }

  .prices {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;

    .price__item {
      .label { font-size: 0.72rem; color: #888; margin: 0; }
      .value { font-weight: 600; font-size: 0.95rem; margin: 0; }
    }
  }

  .buyer__note {
    font-size: 0.85rem;
    color: #555;
    background: #f9fafb;
    border-radius: 8px;
    padding: 10px 14px;
  }

  .counter__form {
    display: flex;
    gap: 10px;
    align-items: flex-end;
    flex-wrap: wrap;

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        font-size: 0.78rem;
        font-weight: 600;
        color: #444;
      }

      input {
        padding: 8px 12px;
        border: 1.5px solid rgba(187, 187, 187, 0.5);
        border-radius: 8px;
        font-size: 0.9rem;
        outline: none;
        width: 140px;

        &:focus { border-color: var(--orrsiPrimary, #fc5353); }
      }
    }

    button {
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      background: #1d4ed8;
      color: #fff;
      height: fit-content;

      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
  }

  .actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    button {
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: none;

      &.accept { background: #22c55e; color: #fff; }
      &.reject { background: transparent; border: 1px solid #ef4444; color: #ef4444; }
      &.toggle__counter { background: transparent; border: 1px solid #1d4ed8; color: #1d4ed8; }

      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
  }
`;

const STATUS_FILTERS = [
  { label: "All", value: undefined },
  { label: "Pending", value: "pending" },
  { label: "Countered", value: "countered" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

const formatCurrency = (n) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n || 0);

function NegotiationItem({ neg }) {
  const [showCounter, setShowCounter] = useState(false);
  const [counterPrice, setCounterPrice] = useState("");
  const [counterNote, setCounterNote] = useState("");
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["seller-negotiations"] });

  const counterMut = useMutation({
    mutationFn: counterNegotiation,
    onSuccess: () => { setShowCounter(false); setCounterPrice(""); invalidate(); },
  });

  const acceptMut = useMutation({ mutationFn: acceptNegotiation, onSuccess: invalidate });
  const rejectMut = useMutation({ mutationFn: rejectNegotiation, onSuccess: invalidate });

  const canAct = neg.status === "pending" || neg.status === "countered";

  return (
    <NegCard>
      <div className="card__top">
        <p className="product__name">{neg.productId?.productName || "Product"}</p>
        <span className={`status ${neg.status}`}>{neg.status}</span>
      </div>

      <div className="prices">
        <div className="price__item">
          <p className="label">Listed</p>
          <p className="value">{formatCurrency(neg.originalPrice)}</p>
        </div>
        <div className="price__item">
          <p className="label">Buyer Offer</p>
          <p className="value" style={{ color: "#dc2626" }}>{formatCurrency(neg.requestedPrice)}</p>
        </div>
        {neg.counterPrice && (
          <div className="price__item">
            <p className="label">Your Counter</p>
            <p className="value" style={{ color: "#1d4ed8" }}>{formatCurrency(neg.counterPrice)}</p>
          </div>
        )}
        <div className="price__item">
          <p className="label">Qty</p>
          <p className="value">{neg.quantity}</p>
        </div>
      </div>

      {neg.buyerNote && (
        <div className="buyer__note">
          <strong>Buyer note:</strong> {neg.buyerNote}
        </div>
      )}

      {canAct && (
        <div className="actions">
          <button
            className="accept"
            onClick={() => acceptMut.mutate(neg._id)}
            disabled={acceptMut.isPending}
          >
            Accept
          </button>
          <button
            className="toggle__counter"
            onClick={() => setShowCounter((v) => !v)}
          >
            {showCounter ? "Cancel Counter" : "Counter Offer"}
          </button>
          <button
            className="reject"
            onClick={() => rejectMut.mutate({ negotiationId: neg._id })}
            disabled={rejectMut.isPending}
          >
            Reject
          </button>
        </div>
      )}

      {showCounter && (
        <div className="counter__form">
          <div className="field">
            <label>Counter Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={counterPrice}
              onChange={(e) => setCounterPrice(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Note (optional)</label>
            <input
              type="text"
              placeholder="Message to buyer"
              value={counterNote}
              onChange={(e) => setCounterNote(e.target.value)}
            />
          </div>
          <button
            onClick={() =>
              counterMut.mutate({
                negotiationId: neg._id,
                counterPrice: parseFloat(counterPrice),
                note: counterNote,
              })
            }
            disabled={counterMut.isPending || !counterPrice}
          >
            {counterMut.isPending ? "Sending..." : "Send Counter"}
          </button>
        </div>
      )}
    </NegCard>
  );
}

export default function NegotiationsScreen() {
  const [statusFilter, setStatusFilter] = useState(undefined);

  const { data, isLoading } = useQuery({
    queryKey: ["seller-negotiations", statusFilter],
    queryFn: () => fetchSellerNegotiations({ status: statusFilter }),
    staleTime: 30_000,
  });

  const negotiations = data?.data?.negotiations || [];

  return (
    <Wrapper>
      <h1>Negotiations Inbox</h1>

      <div className="filter__row">
        {STATUS_FILTERS.map((f) => (
          <button
            key={String(f.value)}
            className={statusFilter === f.value ? "active" : ""}
            onClick={() => setStatusFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="empty__msg">Loading...</p>
      ) : negotiations.length === 0 ? (
        <p className="empty__msg">No negotiations found.</p>
      ) : (
        negotiations.map((neg) => <NegotiationItem key={neg._id} neg={neg} />)
      )}
    </Wrapper>
  );
}

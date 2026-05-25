import styled from "styled-components";

export const OrderDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  /* ── Shared card ── */
  .detail__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);

    .card__header {
      padding: 16px 24px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-size: 0.93rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
        display: flex;
        align-items: center;
      }
    }

    .card__body {
      padding: 22px 24px;
    }
  }

  /* ── Grid layouts ── */
  .info__grid {
    display: grid;
    gap: 20px;

    &.two__col   { grid-template-columns: 1fr 1fr; }
    &.three__col { grid-template-columns: 1fr 1fr 1fr; }

    @media (max-width: 860px) {
      &.three__col { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 640px) {
      &.two__col, &.three__col { grid-template-columns: 1fr; }
    }
  }

  /* ── Order header card ── */
  .order__header__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 22px 24px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;

    .header__left {
      display: flex;
      flex-direction: column;
      gap: 7px;

      .order__num {
        font-size: 1.3rem;
        font-weight: 800;
        color: #111;
        font-family: ui-monospace, "SF Mono", monospace;
      }

      .order__meta {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;

        .meta__dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #ccc;
        }

        span {
          font-size: 0.82rem;
          color: #888;
        }

        .intl__badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 2px 8px;
          border-radius: 20px;
          background: #eff6ff;
          color: #3b82f6;
          border: 1px solid #93c5fd;
          font-size: 0.72rem;
          font-weight: 700;
        }
      }
    }

    .header__right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  /* ── Customer section ── */
  .customer__section {
    display: flex;
    align-items: center;
    gap: 14px;

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(252, 83, 83, 0.1);
      color: var(--oosriPrimary);
      font-size: 1.1rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .customer__info {
      h4 {
        font-size: 0.95rem;
        font-weight: 700;
        color: #111;
        margin: 0 0 3px;
      }

      p {
        font-size: 0.8rem;
        color: #aaa;
        margin: 0;
        font-family: ui-monospace, "SF Mono", monospace;
      }
    }
  }

  /* ── Info rows ── */
  .info__rows {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .info__item {
    display: flex;
    flex-direction: column;
    gap: 3px;

    .info__label {
      font-size: 0.68rem;
      font-weight: 700;
      color: #bbb;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .info__value {
      font-size: 0.88rem;
      font-weight: 600;
      color: #1a1a1a;
    }

    .tracking__link {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--oosriPrimary);
      text-decoration: none;
      font-family: ui-monospace, "SF Mono", monospace;
      &:hover { text-decoration: underline; }
    }

    .tracking__num {
      font-family: ui-monospace, "SF Mono", monospace;
      letter-spacing: 0.5px;
    }
  }

  /* ── Address block ── */
  .address__block {
    .address__full {
      font-size: 0.9rem;
      color: #1a1a1a;
      line-height: 1.6;
      margin: 0 0 10px;
    }

    .address__empty {
      font-size: 0.85rem;
      color: #ccc;
      margin: 0;
    }

    .address__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      .address__chip {
        padding: 3px 10px;
        border-radius: 20px;
        background: #f5f5f5;
        color: #666;
        font-size: 0.75rem;
        font-weight: 600;
        border: 1px solid #ebebeb;
      }
    }
  }

  /* ── Product list ── */
  .product__list {
    display: flex;
    flex-direction: column;

    .product__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      border-bottom: 1px solid #f5f5f5;
      gap: 16px;

      &:last-child { border-bottom: none; }

      .product__left {
        display: flex;
        align-items: center;
        gap: 14px;
        flex: 1;
        min-width: 0;

        .product__thumb {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          overflow: hidden;
          background: #f5f5f5;
          border: 1px solid #f0f0f0;
          flex-shrink: 0;

          img { width: 100%; height: 100%; object-fit: cover; }

          .thumb__placeholder {
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.1rem; color: #ccc; font-weight: 700;
          }
        }

        .product__info {
          min-width: 0;

          .product__name {
            font-size: 0.88rem; font-weight: 600; color: #111;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            margin: 0 0 3px;
          }

          .product__id {
            font-size: 0.72rem; color: #bbb;
            font-family: ui-monospace, "SF Mono", monospace;
            margin: 0 0 2px;
          }

          .product__qty {
            font-size: 0.74rem; color: #888; margin: 0;
          }
        }
      }

      .product__right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
        flex-shrink: 0;

        .unit__price {
          font-size: 0.74rem;
          color: #bbb;
        }

        .product__total {
          font-size: 0.95rem;
          font-weight: 800;
          color: #111;
        }
      }
    }
  }

  /* ── Payment totals ── */
  .summary__totals {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .total__row {
      display: flex;
      justify-content: space-between;
      font-size: 0.84rem;

      span:first-child { color: #888; }
      span:last-child  { font-weight: 600; color: #333; }

      &.grand {
        padding-top: 8px;
        border-top: 1px dashed #f0f0f0;
        margin-top: 2px;

        span:first-child { color: #111; font-weight: 700; }
        span:last-child  { font-weight: 800; color: #111; font-size: 1rem; }
      }
    }
  }

  /* ── Payout card ── */
  .payout__card {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .payout__amount {
      font-size: 2rem;
      font-weight: 800;
      color: #16a34a;
      line-height: 1;
    }

    .payout__breakdown {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 12px;
      background: #f9fafb;
      border-radius: 8px;

      .pb__row {
        display: flex;
        justify-content: space-between;
        font-size: 0.81rem;

        span:first-child { color: #888; }
        span:last-child  { font-weight: 600; color: #333; }

        &.deduct {
          span:last-child { color: #ef4444; }
        }
      }
    }

    .payout__status {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.74rem;
      font-weight: 600;
      align-self: flex-start;

      &.ready   { background: #f0fdf4; color: #16a34a; border: 1px solid #86efac; }
      &.pending { background: #fffbeb; color: #d97706; border: 1px solid #fcd34d; }
    }
  }

  /* ── Status badges ── */
  .status__badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: capitalize;
    white-space: nowrap;

    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    &.pending    { background: #eff6ff; color: #3b82f6; border: 1px solid #93c5fd; }
    &.processing { background: #fff7ed; color: #ea580c; border: 1px solid #fdba74; }
    &.pickup     { background: #fffbeb; color: #d97706; border: 1px solid #fcd34d; }
    &.delivered  { background: #f0fdf4; color: #16a34a; border: 1px solid #86efac; }
    &.cancelled  { background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; }
    &.default    { background: #f5f5f5; color: #666;    border: 1px solid #e0e0e0; }
  }

  .payment__badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    white-space: nowrap;

    &.paid    { background: #f0fdf4; color: #16a34a; border: 1px solid #86efac; }
    &.pending { background: #f5f5f5; color: #888;    border: 1px solid #e0e0e0; }
    &.pod     { background: #fff7ed; color: #ea580c; border: 1px solid #fdba74; }
  }

  /* ── Skeleton loading ── */
  .loading__state {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .skeleton__header,
    .skeleton__card {
      border-radius: 14px;
      background: linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
    }

    .skeleton__header { height: 90px; }
    .skeleton__card   { height: 160px; }
  }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── Error ── */
  .error__state {
    padding: 60px 24px;
    text-align: center;
    color: #aaa;
    font-size: 0.9rem;
  }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .order__header__card {
      padding: 16px;
      .order__num { font-size: 1rem; }
    }

    .detail__card {
      .card__header { padding: 14px 16px; }
      .card__body   { padding: 16px; }
    }

    .product__list .product__row { padding: 14px 16px; }
  }
`;

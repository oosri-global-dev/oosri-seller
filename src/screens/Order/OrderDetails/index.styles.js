import styled from "styled-components";

export const OrderDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 960px;

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
      }
    }

    .card__body {
      padding: 22px 24px;
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
      gap: 6px;

      .order__num {
        font-size: 1.2rem;
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

  /* ── Product list ── */
  .product__list {
    display: flex;
    flex-direction: column;
    gap: 0;

    .product__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 0;
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
          width: 56px;
          height: 56px;
          border-radius: 10px;
          overflow: hidden;
          background: #f5f5f5;
          border: 1px solid #f0f0f0;
          flex-shrink: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .thumb__placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            color: #ccc;
            font-weight: 700;
          }
        }

        .product__info {
          min-width: 0;

          .product__name {
            font-size: 0.88rem;
            font-weight: 600;
            color: #111;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 0 3px;
          }

          .product__id {
            font-size: 0.74rem;
            color: #bbb;
            font-family: ui-monospace, "SF Mono", monospace;
          }
        }
      }

      .product__price {
        font-size: 0.82rem;
        color: #888;
        text-decoration: line-through;
        white-space: nowrap;
      }

      .product__total {
        font-size: 0.95rem;
        font-weight: 800;
        color: #111;
        white-space: nowrap;
      }
    }
  }

  /* ── Info grid ── */
  .info__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  /* ── Info rows ── */
  .info__row {
    display: flex;
    flex-direction: column;
    gap: 14px;

    .info__item {
      display: flex;
      flex-direction: column;
      gap: 3px;

      .info__label {
        font-size: 0.7rem;
        font-weight: 700;
        color: #bbb;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .info__value {
        font-size: 0.88rem;
        font-weight: 600;
        color: #1a1a1a;
      }
    }
  }

  /* ── Payment summary ── */
  .payment__summary {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .pay__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.84rem;

      .pay__label { color: #888; }
      .pay__value { font-weight: 600; color: #333; }

      &.total {
        padding-top: 10px;
        border-top: 1px solid #f0f0f0;
        margin-top: 2px;

        .pay__label { color: #111; font-weight: 700; font-size: 0.9rem; }
        .pay__value { color: #111; font-weight: 800; font-size: 1rem; }
      }
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

    &.paid    { background: #f0fdf4; color: #16a34a; border: 1px solid #86efac; }
    &.pending { background: #f5f5f5; color: #888;    border: 1px solid #e0e0e0; }
    &.pod     { background: #fff7ed; color: #ea580c; border: 1px solid #fdba74; }
  }

  /* ── Loading / error ── */
  .loading__state,
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
  }
`;

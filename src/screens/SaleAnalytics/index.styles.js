import styled from "styled-components";

export const SaleAnalyticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  /* ── KPI grid ── */
  .kpi__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 480px) { grid-template-columns: 1fr; }
  }

  .kpi__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 20px 22px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 14px;

    .kpi__top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .kpi__icon {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: rgba(252, 83, 83, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--oosriPrimary);
      }

      .kpi__trend {
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 20px;

        &.up   { color: #16a34a; background: #f0fdf4; }
        &.down { color: #dc2626; background: #fef2f2; }
        &.neutral { color: #888; background: #f5f5f5; }
      }
    }

    .kpi__value {
      font-size: 1.75rem;
      font-weight: 800;
      color: #111;
      letter-spacing: -0.5px;
      line-height: 1;
    }

    .kpi__label {
      font-size: 0.78rem;
      color: #aaa;
      font-weight: 500;
      margin-top: -8px;
    }
  }

  /* ── Chart card ── */
  .chart__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);

    .chart__header {
      padding: 18px 24px 14px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;

      .chart__title {
        h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 3px;
        }
        p {
          font-size: 0.78rem;
          color: #aaa;
          margin: 0;
        }
      }

      .period__tabs {
        display: flex;
        gap: 4px;

        .period__pill {
          height: 30px;
          padding: 0 12px;
          border-radius: 20px;
          border: 1px solid #f0f0f0;
          background: #fafafa;
          font-size: 0.75rem;
          font-weight: 600;
          color: #888;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;

          &:hover:not(.active) { border-color: #e0e0e0; color: #555; }

          &.active {
            background: var(--oosriPrimary);
            border-color: var(--oosriPrimary);
            color: #fff;
          }
        }
      }
    }

    .chart__body {
      padding: 20px 24px 16px;
    }
  }

  /* ── Insights grid ── */
  .insights__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 640px) { grid-template-columns: 1fr; }
  }

  .insight__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);

    .insight__header {
      padding: 14px 20px;
      border-bottom: 1px solid #f5f5f5;

      h3 {
        font-size: 0.78rem;
        font-weight: 700;
        color: #aaa;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0;
      }
    }

    .insight__body {
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 14px;

      .insight__thumb {
        width: 52px;
        height: 52px;
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
          font-size: 1rem;
          color: #ccc;
          font-weight: 700;
        }
      }

      .insight__info {
        flex: 1;
        min-width: 0;

        .insight__name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #111;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0 0 3px;
        }

        .insight__sub {
          font-size: 0.78rem;
          color: #aaa;
        }
      }

      .insight__chart {
        width: 100px;
        flex-shrink: 0;
      }
    }

    .insight__trend {
      padding: 8px 20px 14px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.76rem;
      font-weight: 600;

      &.up   { color: #16a34a; }
      &.down { color: #dc2626; }

      span { color: #aaa; font-weight: 400; }
    }

    .insight__empty {
      padding: 28px 20px;
      text-align: center;
      color: #ccc;
      font-size: 0.82rem;
    }
  }

  /* ── Recent orders card ── */
  .orders__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);

    .orders__header {
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

      .see__all {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--oosriPrimary);
        text-decoration: none;
        cursor: pointer;
        background: none;
        border: none;
        font-family: inherit;

        &:hover { text-decoration: underline; }
      }
    }

    .ant-table-thead > tr > th {
      background: #fafafa !important;
      font-size: 0.72rem;
      font-weight: 700;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      border-bottom: 1px solid #f0f0f0 !important;
      padding: 10px 16px;
    }

    .ant-table-tbody > tr > td {
      padding: 12px 16px;
      border-bottom: 1px solid #f8f8f8 !important;
      font-size: 0.86rem;
    }

    .ant-table-tbody > tr:last-child > td { border-bottom: none !important; }
    .ant-table-tbody > tr:hover > td { background: #fafafa !important; }
    .ant-pagination { display: none; }
  }

  /* ── Shared badge styles ── */
  .status__badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: capitalize;
    white-space: nowrap;

    &::before {
      content: "";
      width: 5px;
      height: 5px;
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

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .chart__card .chart__header { padding: 14px 16px 12px; }
    .chart__card .chart__body  { padding: 14px 16px; }
    .insight__card .insight__body { padding: 14px 16px; }
    .orders__card .orders__header { padding: 14px 16px; }
  }
`;

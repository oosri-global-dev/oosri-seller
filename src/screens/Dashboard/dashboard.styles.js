import styled from "styled-components";

export const DashboardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* ─────────────────────────────────────────────
     KPI GRID
  ───────────────────────────────────────────── */
  .kpi__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .kpi__card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: box-shadow 0.2s ease, transform 0.15s ease;

    &:hover {
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.09);
      transform: translateY(-1px);
    }

    .kpi__top {
      display: flex;
      align-items: center;
      gap: 12px;

      .kpi__icon__wrap {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .kpi__label {
        font-size: 0.8rem;
        color: #999;
        font-weight: 500;
        margin: 0;
        line-height: 1.3;
      }
    }

    .kpi__value {
      font-size: 1.85rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
      line-height: 1;
      letter-spacing: -0.5px;
    }
  }

  /* ─────────────────────────────────────────────
     CHART CARD
  ───────────────────────────────────────────── */
  .chart__card {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;

    .chart__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 20px;

      .chart__title__group {
        h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .chart__date__range {
          font-size: 0.76rem;
          color: #bbb;
          margin: 4px 0 0;
        }
      }

      .chart__filters {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;

        .filter__btn {
          height: 30px;
          padding: 0 12px;
          border-radius: 20px;
          border: 1px solid #efefef;
          background: #f9f9f9;
          font-size: 0.78rem;
          font-weight: 600;
          color: #888;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;

          &:hover {
            border-color: var(--oosriPrimary);
            color: var(--oosriPrimary);
          }

          &.active {
            background: var(--oosriPrimary);
            border-color: var(--oosriPrimary);
            color: #fff;
          }
        }
      }
    }

    .chart__body {
      width: 100%;
    }
  }

  /* ─────────────────────────────────────────────
     RECENT ORDERS CARD
  ───────────────────────────────────────────── */
  .recent__card {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;

    .recent__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;

      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }

      .see__all {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--oosriPrimary);
        text-decoration: none;
        transition: opacity 0.15s;

        &:hover { opacity: 0.75; }
      }
    }

    .recent__table__wrap {
      width: 100%;
      overflow-x: auto;

      /* Antd table overrides */
      .ant-table {
        font-size: 0.88rem;
        font-family: inherit;
      }

      .ant-table-thead > tr > th {
        background: #fafafa;
        font-size: 0.74rem;
        font-weight: 700;
        color: #aaa;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid #f0f0f0;
        padding: 10px 12px;
      }

      .ant-table-tbody > tr > td {
        border-bottom: 1px solid #f8f8f8;
        padding: 12px 12px;
        vertical-align: middle;
      }

      .ant-table-tbody > tr:last-child > td {
        border-bottom: none;
      }

      .ant-table-tbody > tr:hover > td {
        background: #fafafa !important;
      }
    }

    /* Mobile order cards — hidden on desktop */
    .mobile__order__list {
      display: none;
      flex-direction: column;
      gap: 10px;
    }

    .mobile__order__card {
      border: 1px solid #f0f0f0;
      border-radius: 10px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #fafafa;

      .moc__top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }

      .moc__id {
        font-size: 0.88rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }

      .moc__items {
        font-size: 0.74rem;
        color: #bbb;
        margin: 2px 0 0;
      }

      .moc__body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px 16px;
      }

      .moc__field {
        display: flex;
        flex-direction: column;
        gap: 2px;

        .moc__field__label {
          font-size: 0.68rem;
          font-weight: 600;
          color: #bbb;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .moc__field__value {
          font-size: 0.84rem;
          font-weight: 500;
          color: #1a1a1a;
        }
      }

      .moc__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8px;
        border-top: 1px solid #f0f0f0;
      }

      .moc__view {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--oosriPrimary);
        text-decoration: none;
        transition: opacity 0.15s;

        &:hover { opacity: 0.75; }
      }
    }
  }

  /* ─────────────────────────────────────────────
     RESPONSIVE
  ───────────────────────────────────────────── */
  @media (max-width: 900px) {
    .kpi__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Tablet — switch orders table to cards */
  @media (max-width: 640px) {
    .recent__table__wrap { display: none; }
    .mobile__order__list { display: flex; }

    .chart__card {
      padding: 16px;

      .chart__header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }

      .chart__filters {
        width: 100%;
        justify-content: flex-start;
      }
    }

    .chart__body {
      height: 200px;
      min-height: 200px;
    }
  }

  @media (max-width: 480px) {
    gap: 12px;

    .kpi__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .kpi__card {
      padding: 12px 14px;
      gap: 8px;

      .kpi__value { font-size: 1.3rem; }
      .kpi__label { font-size: 0.72rem; }

      .kpi__icon__wrap {
        width: 32px;
        height: 32px;
        border-radius: 8px;
      }
    }

    .chart__card,
    .recent__card {
      padding: 14px;
    }

    .recent__card .recent__header {
      h3 { font-size: 0.9rem; }
    }
  }
`;

import styled from "styled-components";

export const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1100px;

  /* ── Toolbar ── */
  .toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    padding: 14px 18px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

    /* Search: flex-row layout — no absolute positioning */
    .search__wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 260px;
      flex-shrink: 0;
      height: 38px;
      padding: 0 12px;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      background: #fafafa;
      transition: border-color 0.15s;

      &:focus-within {
        border-color: var(--oosriPrimary);
        background: #fff;
      }

      .search__icon {
        color: #bbb;
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }

      .search__input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: 0.84rem;
        color: #333;
        outline: none;
        font-family: inherit;
        min-width: 0;

        &::placeholder { color: #ccc; }
      }
    }

    .status__tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      flex: 1;
      min-width: 0;

      .tab__pill {
        height: 32px;
        padding: 0 13px;
        border-radius: 20px;
        border: 1px solid #f0f0f0;
        background: #fafafa;
        font-size: 0.76rem;
        font-weight: 600;
        color: #888;
        cursor: pointer;
        transition: all 0.15s;
        white-space: nowrap;
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

  /* ── Table card ── */
  .table__wrap {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

    .ant-table-thead > tr > th {
      background: #fafafa !important;
      font-size: 0.72rem;
      font-weight: 700;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #f0f0f0 !important;
      padding: 12px 16px;
    }

    .ant-table-tbody > tr > td {
      padding: 14px 16px;
      border-bottom: 1px solid #f8f8f8 !important;
      vertical-align: middle;
    }

    .ant-table-tbody > tr:last-child > td { border-bottom: none !important; }
    .ant-table-tbody > tr:hover > td { background: #fafafa !important; }

    .ant-pagination {
      padding: 12px 16px;
      margin: 0 !important;
    }
  }

  /* ── Cells ── */
  .order__id__cell {
    .order__code {
      font-size: 0.85rem;
      font-weight: 700;
      color: #111;
      font-family: ui-monospace, "SF Mono", monospace;
    }
    .item__count {
      font-size: 0.72rem;
      color: #bbb;
      margin-top: 2px;
    }
  }

  .customer__cell {
    font-size: 0.87rem;
    font-weight: 500;
    color: #333;
  }

  .amount__cell {
    font-size: 0.9rem;
    font-weight: 700;
    color: #111;
  }

  .date__cell {
    font-size: 0.82rem;
    color: #888;
    white-space: nowrap;
  }

  /* ── Status badges ── */
  .status__badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.3px;
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
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;
    text-transform: capitalize;

    &.paid    { background: #f0fdf4; color: #16a34a; border: 1px solid #86efac; }
    &.pending { background: #f5f5f5; color: #888;    border: 1px solid #e0e0e0; }
    &.pod     { background: #fff7ed; color: #ea580c; border: 1px solid #fdba74; }
  }

  /* ── View button ── */
  .view__btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 11px;
    border-radius: 7px;
    border: 1px solid #f0f0f0;
    background: #fafafa;
    font-size: 0.77rem;
    font-weight: 600;
    color: #666;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;

    &:hover {
      border-color: var(--oosriPrimary);
      color: var(--oosriPrimary);
      background: rgba(252, 83, 83, 0.04);
    }
  }

  /* ── Empty state ── */
  .empty__state {
    padding: 48px 24px;
    text-align: center;

    .empty__title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #555;
      margin-bottom: 6px;
    }
    .empty__sub { font-size: 0.82rem; color: #bbb; }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .toolbar {
      flex-direction: column;
      align-items: stretch;

      .search__wrap {
        width: 100%;
      }

      .status__tabs {
        justify-content: flex-start;
      }
    }
  }
`;

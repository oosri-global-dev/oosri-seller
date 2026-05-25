import styled from "styled-components";

export const ReturnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  /* ── Summary strip ── */
  .summary__strip {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 18px 28px;
    display: flex;
    align-items: center;
    gap: 0;
    box-shadow: 0 1px 6px rgba(0,0,0,.05);
    flex-wrap: wrap;
    gap: 16px;

    .strip__item {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 80px;

      .strip__num {
        font-size: 1.6rem;
        font-weight: 800;
        color: #111;
        line-height: 1;
        letter-spacing: -0.5px;

        &.pending { color: #d97706; }
        &.green   { color: #16a34a; }
        &.red     { color: #dc2626; }
      }

      .strip__label {
        font-size: 0.75rem;
        color: #aaa;
        font-weight: 500;
      }
    }

    .strip__divider {
      width: 1px;
      height: 36px;
      background: #f0f0f0;
      flex-shrink: 0;
    }
  }

  /* ── Toolbar ── */
  .toolbar {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    box-shadow: 0 1px 4px rgba(0,0,0,.04);

    .search__wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 260px;
      flex-shrink: 0;
      height: 36px;
      padding: 0 12px;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      background: #fafafa;
      transition: border-color .15s;

      &:focus-within { border-color: var(--oosriPrimary); background: #fff; }

      .search__icon { color: #bbb; flex-shrink: 0; display: flex; align-items: center; }

      .search__input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: .84rem;
        color: #333;
        outline: none;
        font-family: inherit;
        min-width: 0;
        &::placeholder { color: #ccc; }
      }
    }

    .tab__row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      flex: 1;

      .tab__pill {
        height: 32px;
        padding: 0 12px;
        border-radius: 20px;
        border: 1px solid #f0f0f0;
        background: #fafafa;
        font-size: .75rem;
        font-weight: 600;
        color: #888;
        cursor: pointer;
        white-space: nowrap;
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: all .15s;

        &:hover:not(.active) { border-color: #e0e0e0; color: #555; }

        &.active {
          background: var(--oosriPrimary);
          border-color: var(--oosriPrimary);
          color: #fff;

          .tab__count { background: rgba(255,255,255,.25); color: #fff; }
        }

        .tab__count {
          background: #f0f0f0;
          color: #888;
          font-size: .65rem;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 10px;
          min-width: 16px;
          text-align: center;
        }
      }
    }
  }

  /* ── Table card ── */
  .table__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,.04);

    .ant-table-thead > tr > th {
      background: #fafafa !important;
      font-size: .72rem;
      font-weight: 700;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: .5px;
      border-bottom: 1px solid #f0f0f0 !important;
      padding: 12px 16px;
    }

    .ant-table-tbody > tr > td {
      padding: 13px 16px;
      border-bottom: 1px solid #f8f8f8 !important;
      vertical-align: middle;
    }

    .ant-table-tbody > tr:last-child > td { border-bottom: none !important; }
    .ant-table-tbody > tr:hover > td { background: #fafafa !important; }
    .ant-pagination { padding: 12px 16px; margin: 0 !important; }
  }

  /* ── Cell helpers ── */
  .mono__id {
    font-family: ui-monospace, "SF Mono", monospace;
    font-size: .83rem;
    font-weight: 700;
    color: #111;
  }

  .buyer__name { font-size: .86rem; font-weight: 500; color: #333; }
  .reason__cell { font-size: .86rem; color: #555; text-transform: capitalize; }
  .date__cell { font-size: .81rem; color: #888; white-space: nowrap; }

  .view__btn {
    height: 30px;
    padding: 0 12px;
    border-radius: 7px;
    border: 1px solid #f0f0f0;
    background: #fafafa;
    font-size: .76rem;
    font-weight: 600;
    color: #666;
    cursor: pointer;
    font-family: inherit;
    transition: all .15s;
    white-space: nowrap;

    &:hover {
      border-color: var(--oosriPrimary);
      color: var(--oosriPrimary);
      background: rgba(252,83,83,.04);
    }
  }

  /* ── Empty state ── */
  .empty__state {
    padding: 48px 24px;
    text-align: center;
    color: #ccc;

    .empty__title { font-size: .94rem; font-weight: 600; color: #555; margin: 12px 0 4px; }
    .empty__sub   { font-size: .8rem; color: #bbb; margin: 0; }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .toolbar { flex-direction: column; align-items: stretch; .search__wrap { width: 100%; } }
    .summary__strip { gap: 12px; }
  }
`;

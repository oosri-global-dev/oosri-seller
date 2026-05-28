import styled from "styled-components";

export const PopoverMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  min-width: 170px;

  button {
    display: block;
    width: 100%;
    padding: 8px 12px;
    background: transparent;
    border: none;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 500;
    color: #444;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: background 0.12s;

    &:hover { background: #f5f5f5; }

    &.active {
      background: rgba(252, 83, 83, 0.08);
      color: var(--oosriPrimary);
      font-weight: 700;
    }

    &.danger { color: #ef4444; }
    &.danger:hover { background: #fef2f2; }
  }
`;

export const AllProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  /* ── Toolbar ── */
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 20px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-bottom: none;
    border-radius: 12px 12px 0 0;

    .search__wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fafafa;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 0 12px;
      height: 38px;
      flex: 1;
      max-width: 380px;
      transition: border-color 0.15s;

      &:focus-within {
        border-color: var(--oosriPrimary);
        background: #fff;
      }

      .search__icon { color: #bbb; flex-shrink: 0; }

      .search__input {
        border: none;
        background: transparent;
        outline: none;
        font-size: 0.875rem;
        color: #1a1a1a;
        width: 100%;
        font-family: inherit;

        &::placeholder { color: #bbb; }
      }
    }

    .sort__btn {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 38px;
      padding: 0 14px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fff;
      font-size: 0.82rem;
      font-weight: 600;
      color: #555;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
      flex-shrink: 0;

      &:hover {
        border-color: var(--oosriPrimary);
        color: var(--oosriPrimary);
      }
    }
  }

  /* ── Table wrap ── */
  .table__wrap {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 0 0 12px 12px;
    overflow: hidden;

    .ant-table {
      font-family: inherit;
      font-size: 0.88rem;
    }

    .ant-table-thead > tr > th {
      background: #fafafa;
      font-size: 0.72rem;
      font-weight: 700;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      border-bottom: 1px solid #f0f0f0 !important;
      padding: 12px 16px;
    }

    .ant-table-tbody > tr > td {
      border-bottom: 1px solid #f8f8f8 !important;
      padding: 14px 16px;
      vertical-align: middle;
    }

    .ant-table-tbody > tr:last-child > td {
      border-bottom: none !important;
    }

    .ant-table-tbody > tr:hover > td {
      background: #fafafa !important;
    }
  }

  /* ── Product cell ── */
  .product__cell {
    display: flex;
    align-items: center;
    gap: 12px;

    .product__thumb {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
      background: #f5f5f5;
      border: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .thumb__placeholder {
        font-size: 1.1rem;
        font-weight: 700;
        color: #ccc;
      }
    }

    .product__info {
      .product__name {
        font-size: 0.875rem;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
      }

      .product__brand {
        font-size: 0.76rem;
        color: #aaa;
        margin: 2px 0 0;
      }
    }
  }

  /* ── Price cell ── */
  .price__cell {
    .price__main {
      font-size: 0.88rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }

    .price__old {
      font-size: 0.76rem;
      color: #bbb;
      text-decoration: line-through;
      margin: 2px 0 0;
    }
  }

  /* ── Visibility cell ── */
  .visibility__cell {
    display: flex;
    align-items: center;
    gap: 8px;

    .vis__label {
      font-size: 0.76rem;
      font-weight: 600;
      color: #bbb;

      &.on { color: #16a34a; }
    }
  }

  /* ── Actions cell ── */
  .actions__cell {
    display: flex;
    align-items: center;
    gap: 6px;

    .action__btn {
      width: 32px;
      height: 32px;
      border-radius: 7px;
      border: 1px solid #f0f0f0;
      background: #fafafa;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #999;
      transition: all 0.15s;
      flex-shrink: 0;

      &.view:hover  { color: #3b82f6; background: #eff6ff; border-color: #bfdbfe; }
      &.edit:hover  { color: #f59e0b; background: #fffbeb; border-color: #fde68a; }
      &.delete:hover { color: #ef4444; background: #fef2f2; border-color: #fecaca; }
    }
  }

  /* ── Empty state ── */
  .empty__state {
    padding: 48px 20px;
    text-align: center;

    .empty__title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #555;
      margin: 0 0 6px;
    }

    .empty__sub {
      font-size: 0.82rem;
      color: #aaa;
      margin: 0;
    }
  }

  /* ── Sort popover ── */
  .sort__popover {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 4px;
    min-width: 170px;

    .sort__option {
      display: block;
      width: 100%;
      padding: 8px 12px;
      background: transparent;
      border: none;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 500;
      color: #444;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      transition: background 0.12s;

      &:hover { background: #f5f5f5; }

      &.active {
        background: rgba(252, 83, 83, 0.08);
        color: var(--oosriPrimary);
        font-weight: 700;
      }
    }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .toolbar {
      padding: 12px 14px;
      .search__wrap { max-width: 100%; }
    }

    .table__wrap { overflow-x: auto; }
  }

  @media (max-width: 550px) {
    .toolbar {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

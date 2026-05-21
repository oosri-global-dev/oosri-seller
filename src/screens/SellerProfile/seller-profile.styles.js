import styled from "styled-components";

export const SellersProfileWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  max-width: 1100px;

  /* ── Sidebar ── */
  .profile__sidebar {
    width: 250px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);

    .avatar__section {
      padding: 28px 20px 22px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid #f5f5f5;

      .avatar__wrap {
        width: 76px;
        height: 76px;
        border-radius: 50%;
        overflow: hidden;
        background: rgba(252, 83, 83, 0.08);
        border: 3px solid #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 4px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar__initials {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--oosriPrimary);
          line-height: 1;
        }
      }

      .profile__name {
        font-size: 0.93rem;
        font-weight: 700;
        color: #111;
        text-align: center;
        margin: 0;
        line-height: 1.3;
      }

      .profile__email {
        font-size: 0.74rem;
        color: #aaa;
        text-align: center;
        margin: 0;
        word-break: break-all;
      }

      .biz__badge {
        display: inline-flex;
        align-items: center;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: 700;
        background: rgba(252, 83, 83, 0.07);
        color: var(--oosriPrimary);
        border: 1px solid rgba(252, 83, 83, 0.18);
        margin-top: 2px;
        text-transform: capitalize;
      }
    }

    .sidebar__nav {
      padding: 10px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;

      .nav__item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 13px;
        border-radius: 9px;
        border: none;
        background: transparent;
        font-size: 0.85rem;
        font-weight: 600;
        color: #666;
        cursor: pointer;
        transition: all 0.15s;
        text-align: left;
        font-family: inherit;
        width: 100%;

        .nav__icon {
          color: #ccc;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }

        &:hover:not(.active) {
          background: #fafafa;
          color: #333;
          .nav__icon { color: #999; }
        }

        &.active {
          background: rgba(252, 83, 83, 0.07);
          color: var(--oosriPrimary);
          .nav__icon { color: var(--oosriPrimary); }
        }
      }
    }

    .member__since {
      padding: 14px 20px;
      border-top: 1px solid #f5f5f5;
      text-align: center;

      .since__label {
        font-size: 0.68rem;
        color: #ccc;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: block;
        margin-bottom: 3px;
      }

      .since__value {
        font-size: 0.78rem;
        font-weight: 600;
        color: #aaa;
      }
    }
  }

  /* ── Content area ── */
  .profile__content {
    flex: 1;
    min-width: 0;
  }

  /* ── Section card ── */
  .section__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);

    .section__header {
      padding: 18px 24px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;

      .header__left {
        h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 3px;
        }
        p {
          font-size: 0.76rem;
          color: #aaa;
          margin: 0;
        }
      }

      .header__actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }

      .edit__btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 34px;
        padding: 0 14px;
        border-radius: 8px;
        border: 1px solid #f0f0f0;
        background: #fafafa;
        font-size: 0.79rem;
        font-weight: 600;
        color: #555;
        cursor: pointer;
        transition: all 0.15s;
        font-family: inherit;
        white-space: nowrap;

        &:hover:not(.save) {
          border-color: var(--oosriPrimary);
          color: var(--oosriPrimary);
          background: rgba(252, 83, 83, 0.04);
        }

        &.save {
          background: var(--oosriPrimary);
          border-color: var(--oosriPrimary);
          color: #fff;

          &:hover { background: #e04040; }
          &:active { background: #cc3333; }
        }

        &.cancel {
          color: #aaa;
          &:hover { border-color: #e0e0e0; color: #666; background: #f5f5f5; }
        }
      }
    }

    .section__body {
      padding: 24px;
    }
  }

  /* ── Avatar upload strip ── */
  .avatar__upload__row {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 0 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid #f5f5f5;

    .upload__meta {
      h4 {
        font-size: 0.88rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 4px;
      }
      p {
        font-size: 0.74rem;
        color: #aaa;
        margin: 0;
      }
    }
  }

  /* ── Fields grid ── */
  .fields__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px 32px;
  }

  .field__item {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &.full__width { grid-column: 1 / -1; }

    .field__label {
      font-size: 0.69rem;
      font-weight: 700;
      color: #bbb;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .field__value {
      font-size: 0.9rem;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.4;
    }

    .field__empty {
      font-size: 0.85rem;
      color: #ccc;
      font-style: italic;
    }

    .country__row {
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        width: 18px;
        height: 13px;
        object-fit: cover;
        border-radius: 2px;
      }
    }
  }

  /* ── Resolve status ── */
  .resolve__hint {
    font-size: 0.74rem;
    margin-top: 3px;

    &.resolving { color: #3b82f6; }
    &.resolved  { color: #16a34a; }
  }

  /* ── Document uploads ── */
  .docs__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding-top: 4px;

    .doc__item {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .doc__label {
        font-size: 0.69rem;
        font-weight: 700;
        color: #bbb;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    flex-direction: column;

    .profile__sidebar {
      width: 100%;

      .sidebar__nav {
        flex-direction: row;
        flex-wrap: wrap;
        padding: 10px 10px;
        gap: 4px;
      }

      .member__since { display: none; }
    }
  }

  @media (max-width: 640px) {
    .fields__grid {
      grid-template-columns: 1fr;
    }

    .docs__grid {
      grid-template-columns: 1fr;
    }

    .section__card {
      .section__header { padding: 14px 16px; }
      .section__body   { padding: 16px; }
    }

    .avatar__upload__row { flex-direction: column; align-items: flex-start; }
  }
`;

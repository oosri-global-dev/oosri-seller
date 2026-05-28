import styled from "styled-components";

export const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1100px;

  /* ── Hero: images + summary ── */
  .hero__section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  }

  /* ── Image gallery ── */
  .gallery {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-right: 1px solid #f5f5f5;

    .gallery__main {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 10px;
      overflow: hidden;
      background: #f8f8f8;
      border: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .gallery__thumbs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      .thumb {
        width: 64px;
        height: 64px;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid transparent;
        background: #f8f8f8;
        cursor: pointer;
        padding: 0;
        transition: border-color 0.15s;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        &.active {
          border-color: var(--oosriPrimary);
        }

        &:hover:not(.active) {
          border-color: #e0e0e0;
        }
      }
    }
  }

  /* ── Product summary ── */
  .product__summary {
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;

    .summary__badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      .status__badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.3px;

        &::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        &.active {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #86efac;
        }

        &.hidden {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fca5a5;
        }
      }

      .type__badge {
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.72rem;
        font-weight: 600;
        background: #f5f5f5;
        color: #666;
        border: 1px solid #e8e8e8;
        text-transform: capitalize;
      }
    }

    .product__title {
      font-size: 1.55rem;
      font-weight: 700;
      color: #111;
      margin: 0;
      line-height: 1.3;
    }

    /* ── Price block ── */
    .price__block {
      display: flex;
      align-items: baseline;
      gap: 10px;
      flex-wrap: wrap;

      .price__main {
        font-size: 1.65rem;
        font-weight: 800;
        color: #111;
        letter-spacing: -0.5px;
      }

      .price__old {
        font-size: 1rem;
        color: #bbb;
        text-decoration: line-through;
      }

      .discount__badge {
        padding: 2px 8px;
        border-radius: 5px;
        background: rgba(252, 83, 83, 0.1);
        color: var(--oosriPrimary);
        font-size: 0.8rem;
        font-weight: 700;
      }
    }

    /* ── Meta grid ── */
    .meta__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      border: 1px solid #f0f0f0;
      border-radius: 10px;
      overflow: hidden;

      .meta__item {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 12px 14px;
        border-bottom: 1px solid #f5f5f5;
        border-right: 1px solid #f5f5f5;

        &:nth-child(2n) { border-right: none; }
        &:nth-last-child(-n+2) { border-bottom: none; }

        .meta__label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #bbb;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .meta__value {
          font-size: 0.88rem;
          font-weight: 600;
          color: #1a1a1a;
        }
      }
    }

    /* ── Payout breakdown ── */
    .payout__breakdown {
      background: #fafff8;
      border: 1px solid #d1fae5;
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .payout__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.84rem;

        .payout__row__label {
          color: #555;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 500;
        }

        .payout__row__value {
          font-weight: 700;
          &.green { color: #16a34a; font-size: 1rem; }
          &.muted { color: #aaa; font-size: 0.82rem; }
        }
      }
    }

    /* ── Stock section ── */
    .stock__section {
      border: 1px solid #f0f0f0;
      border-radius: 10px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #fafafa;

      .stock__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .stock__title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }

      .stock__qty__display {
        display: flex;
        align-items: baseline;
        gap: 6px;

        .stock__number {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1;
          &.good     { color: #16a34a; }
          &.low      { color: #f59e0b; }
          &.critical { color: #ef4444; }
          &.out      { color: #ef4444; }
        }

        .stock__unit {
          font-size: 0.82rem;
          color: #aaa;
        }
      }
    }

    /* ── Stock indicator bar ── */
    .stock__indicator {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .stock__bar__track {
        height: 6px;
        border-radius: 3px;
        background: #f0f0f0;
        overflow: hidden;

        .stock__bar__fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.4s ease;
        }
      }

      .stock__meta {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.74rem;
        font-weight: 600;

        .stock__count {
          margin-left: auto;
          font-size: 0.72rem;
          color: #aaa;
          font-weight: 500;
        }
      }
    }

    /* ── Tags ── */
    .tags__row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;

      .tag__pill {
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.72rem;
        font-weight: 600;
        background: #f5f5f5;
        color: #666;
        border: 1px solid #e8e8e8;
      }
    }

    /* ── Edit CTA ── */
    .edit__cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 44px;
      border-radius: 10px;
      background: var(--oosriPrimary);
      color: #fff;
      border: none;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s, transform 0.1s;
      font-family: inherit;
      margin-top: auto;

      &.small {
        height: 28px;
        padding: 0 12px;
        font-size: 0.73rem;
        border-radius: 6px;
        margin-top: 0;
      }

      &:hover  { background: #e04040; }
      &:active { background: #cc3333; transform: scale(0.99); }
    }
  }

  /* ── Detail cards (description, specs) ── */
  .detail__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;

    .detail__card__header {
      padding: 16px 24px;
      border-bottom: 1px solid #f5f5f5;

      h3 {
        font-size: 0.95rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }
    }

    .detail__card__body {
      padding: 24px;

      /* Prose styles for product description */
      &.prose {
        color: #444;
        line-height: 1.75;
        font-size: 0.92rem;

        h1, h2, h3 { color: #111; margin: 1.2em 0 0.5em; font-weight: 700; }
        p  { margin: 0 0 0.85em; }
        ul, ol { padding-left: 1.5em; margin: 0 0 0.85em; }
        li { margin-bottom: 0.35em; }
        strong { color: #111; }
        a  { color: var(--oosriPrimary); }
      }
    }
  }

  /* ── Specs grid ── */
  .specs__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    overflow: hidden;

    .spec__item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 14px 16px;
      border-bottom: 1px solid #f5f5f5;
      border-right: 1px solid #f5f5f5;

      &:nth-child(3n) { border-right: none; }

      .spec__label {
        font-size: 0.7rem;
        font-weight: 700;
        color: #bbb;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .spec__value {
        font-size: 0.88rem;
        font-weight: 600;
        color: #1a1a1a;
      }
    }
  }

  /* ── Reviews section ── */
  .reviews__list {
    display: flex;
    flex-direction: column;
    gap: 0;

    .review__item {
      display: flex;
      gap: 14px;
      padding: 16px 0;
      border-bottom: 1px solid #f5f5f5;

      &:last-child { border-bottom: none; }
    }

    .reviewer__avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #f5f5f5;
      border: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.82rem;
      font-weight: 700;
      color: #888;
      flex-shrink: 0;
    }

    .review__body { flex: 1; min-width: 0; }

    .review__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 4px;
    }

    .reviewer__name {
      font-size: 0.85rem;
      font-weight: 700;
      color: #1a1a1a;
    }

    .review__date {
      font-size: 0.72rem;
      color: #bbb;
      white-space: nowrap;
    }

    .stars__row {
      display: flex;
      gap: 2px;
      margin-bottom: 6px;
    }

    .review__text {
      font-size: 0.84rem;
      color: #555;
      line-height: 1.55;
      margin: 0;
    }

    .status__pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 20px;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.3px;
      margin-top: 6px;

      &.active  { background: #f0fdf4; color: #16a34a; }
      &.flagged { background: #fffbeb; color: #b45309; }
      &.hidden  { background: #fef2f2; color: #dc2626; }
    }
  }

  .reviews__empty {
    padding: 32px 0;
    text-align: center;
    color: #bbb;
    font-size: 0.85rem;
  }

  .reviews__pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    border-top: 1px solid #f5f5f5;

    .page__info {
      font-size: 0.78rem;
      color: #999;
      span { font-weight: 700; color: #444; }
    }

    .page__btns {
      display: flex;
      gap: 6px;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 6px;
        border: 1px solid #e8e8e8;
        background: #fff;
        cursor: pointer;
        color: #555;
        transition: all 0.12s;

        &:hover:not(:disabled) { border-color: var(--oosriPrimary); color: var(--oosriPrimary); }
        &:disabled { opacity: 0.35; cursor: not-allowed; }
      }
    }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .hero__section {
      grid-template-columns: 1fr;
    }

    .gallery {
      border-right: none;
      border-bottom: 1px solid #f5f5f5;
      padding: 16px;
    }

    .product__summary {
      padding: 20px 16px;
    }

    .product__title { font-size: 1.25rem; }

    .specs__grid {
      grid-template-columns: 1fr 1fr;

      .spec__item:nth-child(3n) { border-right: 1px solid #f5f5f5; }
      .spec__item:nth-child(2n) { border-right: none; }
    }
  }

  @media (max-width: 480px) {
    .meta__grid { grid-template-columns: 1fr; }
    .meta__item { border-right: none !important; }

    .specs__grid {
      grid-template-columns: 1fr;
      .spec__item { border-right: none !important; }
    }
  }
`;

/* Kept for EditProduct wrapper in product.jsx */
export const ProductWrapper = styled.div``;

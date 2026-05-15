import styled from "styled-components";

export const CreateProductPageWrapper = styled.div`
  /* Used by productDetails.jsx detail view */
  .container_wrapper {
    flex-wrap: nowrap;
    gap: 24px;

    @media (max-width: 950px) {
      flex-direction: column;
    }
  }

  /* ── Form wrapper ── */
  .create__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 900px;
    padding-bottom: 32px;
  }

  /* ── Section card ── */
  .section__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

    .section__card__header {
      padding: 16px 24px 14px;
      border-bottom: 1px solid #f5f5f5;

      h3 {
        font-size: 0.95rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }

      p {
        font-size: 0.78rem;
        color: #aaa;
        margin: 3px 0 0;
      }
    }

    .section__card__body {
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
  }

  /* ── Field row (2-col grid) ── */
  .field__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  /* ── Individual field ── */
  .product__item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;

    label {
      font-size: 0.82rem;
      font-weight: 600;
      color: #444;
    }

    .req {
      color: var(--oosriPrimary);
      font-weight: 700;
    }

    .opt {
      color: #aaa;
      font-weight: 400;
      font-size: 0.74rem;
    }

    .no__subcategory {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      background: #fafafa;
      border: 1px dashed #e0e0e0;
      border-radius: 6px;
      font-size: 0.8rem;
      color: #bbb;
      font-style: italic;
    }

    .field__hint {
      font-size: 0.74rem;
      color: #bbb;
      margin: 0;
    }

    .field__error {
      font-size: 0.74rem;
      color: #FC5353;
      margin: 0;
    }
  }

  /* ── Payout preview ── */
  .payout__preview {
    background: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 14px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .payout__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.82rem;
      color: #777;

      strong { color: #1a1a1a; }

      &.highlight {
        color: var(--oosriPrimary);
        font-weight: 600;

        strong { color: var(--oosriPrimary); font-size: 0.95rem; }
      }
    }
  }

  /* ── Image upload ── */
  .img__upload__wrap {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    .upload__container {
      background-color: transparent !important;
      border-style: dashed !important;
      padding: 12px 16px;
      height: 150px !important;
      width: 150px;

      .main__text {
        color: #999 !important;
        font-size: 0.74rem !important;
      }

      svg {
        width: 14px !important;
        height: 14px !important;
        fill: #bbb !important;
      }
    }

    .upload__stack {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .upload__container {
        height: 70px !important;
      }

      .upload__title {
        display: none !important;
      }
    }
  }

  .upload__hint {
    font-size: 0.8rem;
    color: #3b82f6;
    margin: 0;
  }

  .field__error {
    font-size: 0.74rem;
    color: #FC5353;
    margin: 0;
  }

  /* ── Submit bar ── */
  .submit__bar {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

    .submit__note {
      font-size: 0.8rem;
      color: #aaa;
      margin: 0;
      flex: 1;
    }

    button {
      background-color: var(--oosriPrimary);
      color: var(--oosriWhite);
      min-width: 160px;
      flex-shrink: 0;
    }

    @media (max-width: 550px) {
      flex-direction: column;
      align-items: stretch;

      button { width: 100%; }
    }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .create__form { max-width: 100%; }

    .section__card {
      .section__card__header { padding: 14px 16px 12px; }
      .section__card__body  { padding: 16px; }
    }

    .img__upload__wrap {
      .upload__container {
        width: 120px;
        height: 120px !important;
      }
    }
  }
`;

import styled from "styled-components";

export const CreateBusinessWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 24px 60px;

  > * {
    width: 100%;
    max-width: 760px;
  }

  /* ── Page Header ── */
  .page__header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 4px;

    .back__row {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      width: fit-content;

      .back__icon {
        color: #888;
        display: flex;
        align-items: center;
        transition: color 0.15s;
      }

      .back__label {
        font-size: 0.82rem;
        color: #888;
        font-weight: 500;
      }

      &:hover .back__icon,
      &:hover .back__label {
        color: var(--oosriPrimary);
      }
    }

    .title__block {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;

      h1 {
        font-size: 1.5rem;
        font-weight: 800;
        color: #111;
        margin: 0;
        line-height: 1.2;
      }

      .type__badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.72rem;
        font-weight: 700;
        background: rgba(252, 83, 83, 0.08);
        color: var(--oosriPrimary);
        border: 1px solid rgba(252, 83, 83, 0.2);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .subtitle {
      font-size: 0.88rem;
      color: #999;
      margin: 0;
    }
  }

  /* ── Form Card ── */
  .form__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);

    .card__header {
      padding: 16px 24px;
      border-bottom: 1px solid #f5f5f5;

      h3 {
        font-size: 0.92rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0 0 2px;
      }

      p {
        font-size: 0.74rem;
        color: #bbb;
        margin: 0;
      }
    }

    .card__body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
  }

  /* ── Fields grid ── */
  .fields__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 24px;
  }

  .field__wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &.full__col {
      grid-column: 1 / -1;
    }

    label {
      font-size: 0.72rem;
      font-weight: 700;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .ant-form-item {
      margin-bottom: 0;
    }
  }

  /* ── Upload area ── */
  .upload__area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 22px 16px;
    border: 1.5px dashed #e0e0e0;
    border-radius: 10px;
    background: #fafafa;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    text-align: center;
    width: 100%;

    &:hover {
      border-color: var(--oosriPrimary);
      background: rgba(252, 83, 83, 0.02);
    }

    &.has__file {
      border-color: #4ade80;
      background: rgba(74, 222, 128, 0.04);
    }

    .upload__icon {
      color: #ccc;
      display: flex;
      align-items: center;
      margin-bottom: 2px;
    }

    .upload__title {
      font-size: 0.82rem;
      font-weight: 600;
      color: #555;
      margin: 0;
    }

    .upload__hint {
      font-size: 0.71rem;
      color: #bbb;
      margin: 0;
    }

    .upload__file__name {
      font-size: 0.78rem;
      color: #16a34a;
      font-weight: 600;
      margin: 0;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  /* ── Account resolve hint ── */
  .resolve__hint {
    font-size: 0.73rem;
    margin: 0;

    &.resolving {
      color: #3b82f6;
    }

    &.resolved {
      color: #16a34a;
    }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .fields__grid {
      grid-template-columns: 1fr;
    }

    .form__card {
      .card__header {
        padding: 14px 16px;
      }

      .card__body {
        padding: 16px;
        gap: 14px;
      }
    }

    .page__header {
      h1 {
        font-size: 1.25rem;
      }
    }
  }
`;

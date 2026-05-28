import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const skeletonBg = `
  background: linear-gradient(90deg, #f0f0f0 25%, #fafafa 50%, #f0f0f0 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
`;

export const ReturnDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  /* ── Skeleton ── */
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .skeleton__header {
    height: 80px;
    border-radius: 14px;
    ${skeletonBg}
  }

  .skeleton__card {
    height: 140px;
    border-radius: 14px;
    ${skeletonBg}

    &.tall { height: 220px; }
  }

  .cards__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 640px) { grid-template-columns: 1fr; }
  }

  /* ── Page header ── */
  .page__header {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 20px 24px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    box-shadow: 0 1px 6px rgba(0,0,0,.05);
    flex-wrap: wrap;

    .header__left {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .back__link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: .8rem;
      font-weight: 600;
      color: #aaa;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      font-family: inherit;
      transition: color .15s;
      margin-bottom: 4px;

      &:hover { color: var(--oosriPrimary); }
    }

    .header__meta {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .return__ref {
      font-size: 1.25rem;
      font-weight: 800;
      color: #111;
      margin: 0;
      font-family: ui-monospace, "SF Mono", monospace;
    }

    .header__date {
      font-size: .78rem;
      color: #aaa;
      margin: 0;
    }

    .action__btns {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-shrink: 0;
      flex-wrap: wrap;

      .btn__approve, .btn__reject {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 38px;
        padding: 0 18px;
        border-radius: 8px;
        font-size: .84rem;
        font-weight: 700;
        cursor: pointer;
        border: none;
        font-family: inherit;
        transition: opacity .15s;

        &:hover { opacity: .88; }
        &:disabled { opacity: .5; cursor: not-allowed; }
      }

      .btn__approve {
        background: #16a34a;
        color: #fff;
      }

      .btn__reject {
        background: #fef2f2;
        color: #dc2626;
        border: 1px solid #fca5a5;
      }
    }
  }

  /* ── Status badge ── */
  .status__badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: .76rem;
    font-weight: 700;
    border: 1px solid;

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  }

  /* ── Status banner ── */
  .status__banner {
    border: 1px solid;
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: .85rem;
    font-weight: 500;
    line-height: 1.5;
  }

  /* ── Info card ── */
  .info__card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 20px 24px;
    box-shadow: 0 1px 6px rgba(0,0,0,.05);
    display: flex;
    flex-direction: column;
    gap: 14px;

    .card__title {
      font-size: .72rem;
      font-weight: 700;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: .5px;
      margin: 0;
      padding-bottom: 12px;
      border-bottom: 1px solid #f5f5f5;
    }
  }

  /* ── Info row ── */
  .info__row {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    .info__icon__wrap {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #888;
      flex-shrink: 0;
    }

    .info__content {
      display: flex;
      flex-direction: column;
      gap: 1px;
      flex: 1;
      min-width: 0;
      justify-content: center;

      .info__label {
        font-size: .72rem;
        color: #bbb;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: .3px;
      }

      .info__value {
        font-size: .88rem;
        color: #111;
        font-weight: 500;
        word-break: break-word;
      }
    }
  }

  .order__link__row {
    padding-top: 4px;

    .order__link {
      font-size: .82rem;
      font-weight: 600;
      color: var(--oosriPrimary);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      font-family: inherit;
      transition: opacity .15s;

      &:hover { opacity: .75; }
    }
  }

  /* ── Details grid ── */
  .details__grid {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .detail__description {
    background: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 12px 16px;

    .detail__desc__label {
      font-size: .72rem;
      font-weight: 700;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: .3px;
      margin: 0 0 6px;
    }

    .detail__desc__text {
      font-size: .86rem;
      color: #333;
      line-height: 1.6;
      margin: 0;
    }
  }

  /* ── Evidence ── */
  .evidence__section {
    border-top: 1px solid #f5f5f5;
    padding-top: 14px;

    .evidence__label {
      font-size: .72rem;
      font-weight: 700;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: .3px;
      margin: 0 0 10px;
    }

    .evidence__grid {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      .evidence__thumb {
        width: 72px;
        height: 72px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #f0f0f0;
        display: block;
        background: #f5f5f5;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity .15s;
        }

        &:hover img { opacity: .8; }
      }
    }
  }

  /* ── Timeline ── */
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .timeline__item {
    display: flex;
    gap: 14px;
    padding-bottom: 16px;
    position: relative;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      left: 6px;
      top: 14px;
      bottom: 0;
      width: 1px;
      background: #f0f0f0;
    }

    &.latest .tl__body { background: #fafafa; border-radius: 8px; padding: 10px 14px; }

    .tl__dot {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 3px;
      border: 2px solid #fff;
      box-shadow: 0 0 0 2px currentColor;
    }

    .tl__body {
      flex: 1;
      min-width: 0;
      padding: 2px 0;
    }

    .tl__top {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 4px;

      .tl__actor {
        font-size: .8rem;
        font-weight: 700;
        color: #333;
      }

      .tl__status {
        font-size: .76rem;
        font-weight: 600;
      }

      .tl__time {
        font-size: .74rem;
        color: #bbb;
        margin-left: auto;
      }
    }

    .tl__note {
      font-size: .82rem;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .page__header { flex-direction: column; }
    .page__header .action__btns { width: 100%; .btn__approve, .btn__reject { flex: 1; justify-content: center; } }
  }
`;

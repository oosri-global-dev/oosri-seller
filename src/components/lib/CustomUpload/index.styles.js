import styled from "styled-components";

export const CustomUploaderWrapper = styled.div`
  .upload__title {
    font-weight: 600;
    margin-bottom: 10px;
    color: #1a1a1a;
  }

  .upload__container {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #bbbbbb;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
    padding: 12px 0;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      border-color: var(--oosriPrimary, #fc5353);
    }

    &.uploading {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
      pointer-events: none;
    }

    &.has-error {
      border-color: #ef4444;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
    }
  }

  /* ── File input (invisible, covers the whole box) ── */
  .upload__input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    &:disabled {
      cursor: not-allowed;
    }
  }

  /* ── Preview image ── */
  .upload__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 1;
  }

  /* ── Placeholder (no image yet) ── */
  .placeholder__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    text-align: center;
    z-index: 1;

    .main__text {
      margin-top: 5px;
      font-size: 14px;
      font-weight: 400;
      color: white;
    }

    svg {
      width: 28px;
      height: 28px;
      fill: white;
    }
  }

  /* ── Progress overlay (sits above the preview image) ── */
  .progress__overlay {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 12px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.72) 0%,
      rgba(0, 0, 0, 0.1) 60%,
      transparent 100%
    );
  }

  .progress__track {
    width: 80%;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 999px;
    overflow: hidden;
  }

  .progress__bar {
    height: 100%;
    background: #3b82f6;
    border-radius: 999px;
    transition: width 0.15s ease;
  }

  .progress__label {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.02em;
  }

  /* ── Success badge ── */
  .status__badge {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  .success__badge {
    color: #22c55e;
    background: rgba(255, 255, 255, 0.9);
  }

  /* ── Validation / upload error text ── */
  .upload__error {
    margin-top: 6px;
    font-size: 11px;
    color: #ef4444;
    max-width: 200px;
    line-height: 1.4;
    display: flex;
    align-items: flex-start;
    gap: 2px;
  }
`;
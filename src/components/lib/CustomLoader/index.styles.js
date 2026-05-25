import styled, { keyframes, css } from "styled-components";

const slide = keyframes`
  0%   { left: -50%; width: 50%; }
  100% { left: 110%; width: 50%; }
`;

export const CustomLoaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* ── Full-screen overlay (no customHeight) ── */
  ${({ customHeight }) => !customHeight && css`
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #ffffff;

    .loader__bar__wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: transparent;
      overflow: hidden;

      .loader__bar__fill {
        position: absolute;
        height: 100%;
        width: 50%;
        background: var(--oosriPrimary, #fc5353);
        animation: ${slide} 1.4s ease-in-out infinite;
      }
    }
  `}

  /* ── Embedded content-area loader (customHeight given) ── */
  ${({ customHeight }) => customHeight && css`
    position: relative;
    width: 100%;
    min-height: ${customHeight};

    .loader__bar__wrap { display: none; }
  `}

  .loader__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .loader__spinner {
    width: 32px;
    height: 32px;
    border: 2.5px solid #f0f0f0;
    border-top-color: var(--oosriPrimary, #fc5353);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

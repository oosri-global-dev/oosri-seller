import styled from "styled-components";
import AuthBg from "@/assets/images/auth-bg.png";

export const AuthLayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100dvh;
  padding: 20px;
  box-sizing: border-box;
  background: #f0f0f0;
  gap: 20px;

  /* ── LEFT PANEL (desktop only) ── */
  .left__section {
    position: sticky;
    top: 20px;
    width: 42%;
    height: calc(100dvh - 40px);
    background-image: url(${AuthBg.src});
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 36px;
    box-sizing: border-box;
    border-radius: 24px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .left__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      160deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.35) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 1;
  }

  .left__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .left__text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    margin-bottom: 20px;
  }

  .hero__text {
    font-size: 1.9rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.25;
    margin: 0;
  }

  .hero__sub {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    line-height: 1.5;
  }

  .left__badge {
    display: inline-flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 500;
    padding: 7px 14px;
    border-radius: 999px;
    width: fit-content;
  }

  /* ── RIGHT PANEL ── */
  .right__section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    box-sizing: border-box;
  }

  /* Hide mobile hero on desktop */
  .mobile__hero {
    display: none;
  }

  /* Form card on desktop */
  .form__card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 32px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 20px;
    min-height: calc(100dvh - 40px);
  }

  /* ── TABLET ── */
  @media (max-width: 1024px) and (min-width: 769px) {
    padding: 16px;
    gap: 16px;

    .left__section {
      width: 38%;
      height: calc(100dvh - 32px);
      top: 16px;
      padding: 28px;
    }
    .hero__text {
      font-size: 1.6rem;
    }
    .form__card {
      padding: 32px 24px;
      min-height: calc(100dvh - 32px);
    }
  }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
    gap: 0;
    background: #ffffff;

    .left__section {
      display: none;
    }

    .right__section {
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      background: #ffffff;
    }

    /* Mobile hero image */
    .mobile__hero {
      display: block;
      position: relative;
      width: 100%;
      height: 240px;
      flex-shrink: 0;
      border-bottom-left-radius: 28px;
      border-bottom-right-radius: 28px;
      overflow: hidden;
    }

    .mobile__hero__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.6) 100%
      );
      z-index: 1;
    }

    .mobile__hero__content {
      position: absolute;
      bottom: 20px;
      left: 20px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .mobile__hero__text {
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-weight: 500;
    }

    /* Form card on mobile */
    .form__card {
      width: 100%;
      min-height: fit-content;
      padding: 28px 24px 48px 24px;
      background: #ffffff;
      border-radius: 0;
    }
  }
`;
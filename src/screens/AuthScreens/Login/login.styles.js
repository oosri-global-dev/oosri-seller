import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 440px;
  gap: 28px;
  padding: 20px 0;
  box-sizing: border-box;

  .header__text {
    font-size: 2rem;
    font-weight: 700;
    color: #111;
    margin: 0;
  }

  .sub__text {
    font-size: 0.92rem;
    color: #666;
    margin: -16px 0 0 0;
    line-height: 1.5;
  }

  label {
    font-size: 0.88rem;
    color: #333;
    font-weight: 500;
  }

  .login__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    .already__acct {
      font-size: 0.88rem;
      width: 100%;
      text-align: center;
      color: #555;
      span {
        text-decoration: underline;
        cursor: pointer;
        color: var(--oosriPrimary);
        font-weight: 500;
      }
    }

    .forgot__pass {
      margin-top: 4px;
      font-size: 0.85rem;
      span {
        color: var(--oosriPrimary);
        cursor: pointer;
        font-weight: 500;
      }
    }
  }

  .form__parent__wrapper {
    width: 100% !important;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 12px 0;

    .header__text {
      font-size: 1.6rem;
    }

    .sub__text {
      font-size: 0.88rem;
    }
  }
`;
import styled from "styled-components";

export const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  gap: 24px;
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
    margin: 0;
    line-height: 1.5;
  }

  label {
    font-size: 0.88rem;
    color: #333;
    font-weight: 500;
  }

  .profile__picture {
    width: 100px;
    height: 100px;
    border: 2px dashed #8d98aa;
    border-radius: 10px;
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    small {
      text-align: center;
      font-size: 0.75rem;
      color: #8d98aa;
      margin-top: 4px;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
      &:hover {
        opacity: 0.5;
      }
    }
    .cancel__icon {
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
    }
  }

  .login__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    .hide__input {
      display: none;
    }

    .already__acct {
      font-size: 0.88rem;
      width: 100%;
      text-align: left;
      color: #555;
      span {
        text-decoration: underline;
        cursor: pointer;
        color: var(--oosriPrimary);
        font-weight: 500;
      }
    }

    .submit__btn {
      margin-top: 8px;
    }
  }

  .choose__avts {
    font-size: 0.85rem;
    text-decoration: underline;
    cursor: pointer;
    color: var(--oosriPrimary);
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

    .single__row {
      flex-direction: column !important;
      flex-wrap: wrap !important;

      .half__box {
        width: 100% !important;
      }
    }
  }
`;
import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const RegisterWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  gap: 35px;
  width: 65%;

  label {
    font-size: 0.9rem;
    color: var(--oosriBlack);
    font-weight: bold;
  }

  .profile__picture {
    width: 100px;
    height: 100px;
    border: 2px dashed #8d98aa;
    border-radius: 8px;
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;

    small {
      text-align: center;
      font-size: 0.8rem;
      color: #8d98aa;
    }
  }

  .login__form {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;

    .already__acct {
      font-size: 0.9rem;
      width: 100%;
      text-align: left;

      span {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .submit__btn {
      margin-top: 20px;
    }
  }

  //target only 550px
  @media (max-width: 550px) {
    .form__parent__wrapper {
      width: 80%;
    }
  }
`;

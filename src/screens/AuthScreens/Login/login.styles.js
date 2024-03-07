import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const LoginWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  gap: 35px;

  label {
    font-size: 0.9rem;
    color: var(--oosriBlack);
    font-weight: bold;
  }

  .login__form {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 80%;

    .already__acct {
      font-size: 0.9rem;
      width: 100%;
      text-align: center;

      span {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .forgot__pass {
      margin-top: 5px;
      font-size: 0.88rem;

      span {
        color: var(--oosriPrimary);
        cursor: pointer;
      }
    }
  }

  //target only 550px
  @media (max-width: 550px) {
    h1 {
      font-size: 1.6rem;
    }

    .sub__text{
      font-size: .9rem;
    }
    
    
    .form__parent__wrapper {
      width: 80%;
    }
  }
`;
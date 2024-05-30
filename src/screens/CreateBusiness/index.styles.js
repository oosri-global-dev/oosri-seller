import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const CreateBusinessWrapper = styled(FlexibleDiv)`
  width: 100%;
  height: 100%;
  gap: 40px;

  .form__wrapper {
    width: 52%;
    margin-top: 30px;

    .single__input__box {
      width: 48%;
    }
  }
`;

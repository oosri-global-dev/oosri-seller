import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const ProductWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5%;

  img{
    width:200px;
    height:300px;
    object-fit:cover;
  }

  .image_text_holder{
   flex-wrap:nowrap;
   margin-top:24px;
   gap:24px;
  }

  .text__item{
   white-space:nowrap;
  }

  .edit__button{
     color:var(--oosriWhite);
     background-color:var(--oosriPrimary);
     padding:0px 50px;
  }
`;
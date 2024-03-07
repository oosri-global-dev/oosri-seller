import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const ProductWrapper = styled(FlexibleDiv)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5%;

  .left__section {
    width: 25%;

    .product__image {
      width: 100%;
      object-fit: cover;
      max-height: 280px;
      border-radius: 15px;
      margin-bottom: 10px;
    }
  }

  .right__section {
    width: 68%;
    height: 100%;

    .image__sections {
      img {
        width: 32%;
        object-fit: cover;
        max-height: 280px;
        border-radius: 15px;
        margin-bottom: 10px;
      }
    }
  }

  @media (max-width: 550px) {
    flex-direction: column-reverse;
    margin: 25px 0;
    gap: 30px;

    .left__section,
    .right__section {
      width: 100%;
    }
  }
`;
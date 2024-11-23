import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const SellersProfileWrapper = styled(FlexibleDiv)`
  .tabs__custom {
    width: 100%;
    margin-bottom: 15px;

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: var(--oosriPrimary) !important;
    }

    .ant-tabs-ink-bar {
      background: var(--oosriPrimary);
    }
  }

  .products__table__section {
    border: 1px solid rgba(224, 224, 224, 0.6);
    border-radius: 8px;
    box-sizing: border-box;

    .search__body__section {
      box-sizing: border-box;
      padding: 25px 20px;

      .search__section {
        width: fit-content;

        .text__field__custom {
          border: 1px solid rgba(224, 224, 224, 0.6);
          width: 300px;
          margin-left: 8px;
        }
      }

      .filter__btn__custom {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;
      }
    }

    .table__class {
      width: 100%;

      .verified__text {
        color: #55d352;
        border: 1px solid #55d352;
        border-radius: 15px;
        padding: 5px 10px;
        font-size: 1rem;
      }
    }
  }

  .profile__details__section{
  padding:20px 0;
  border:1px solid red;
  border-radius: 12px;
  border-color:var(--oosriFadedWhite)
  }

  .profile__info__wrapper {
  width:60%;
  }

  .profile__image__wrapper {
  width:40%;
  }

  .info_cont {
  padding: 20px 30px;
  }

  .info__inner_cont1,.info__inner_cont3,info__inner_cont3,info__inner_cont4 {
  padding-bottom:40px;
  }
  .info__inner_cont3 {
  align-items:flex-start;
  padding-top:40px;
  }

  .info1, .info2 {
  width:50%;
  gap:5px;
  flex-direction:column;
  align-items:flex-start;
  justify-content:center;
  }

  .info1 p:nth-child(1), .info2 > p:nth-child(1) {
      font-weight:600;
  }
 .info1 p:nth-child(2), .info2 > p:nth-child(2) {
      color:var(--oosriFadedWhite)
  }
`;
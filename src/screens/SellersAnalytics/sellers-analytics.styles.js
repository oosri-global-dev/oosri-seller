import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const DashboardWrapper  = styled(FlexibleDiv)`

width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin-bottom: 20px;

  .summary__wrapper {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 15px;

    .single__summary__box {
      border-radius: 12px;
      border-right: 1px solid #fee5ec;
      background: linear-gradient(
        180deg,
        #ffeef3 0%,
        rgba(255, 238, 243, 0) 105.26%
      );
      padding: 22px;
      gap: 25px;
      justify-content: flex-start;

      .icon__wrapper {
        background-color: #fee5ec;
        height: 35px;
        width: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }

      .summary__text {
        display: flex;
        flex-direction: column;
        gap: 10px;

        h1 {
          font-size: 2.6rem;
        }

        .label__text {
          color: #999;
        }
      }
    }
  }

  .graph__section {
    margin-top: 80px;

    .graph__info {
      gap: 5px;
      h4 {
        font-size: 1.2rem;
      }

      p {
        color: #9e9e9e;
      }
    }

    .chart__box {
      .chart-box-cell {
        width: 600px;
      }
    }
  }

  .table__section {
    margin-top: 80px;
    border: 1px solid rgba(224, 224, 224, 0.6);
    border-radius: 8px;
    gap: 30px;
    padding-top: 30px;

    .recent__text {
      font-size: 1.2rem;
    }

    .see__all__text {
      font-size: 1.1rem;
      color: var(--oosriPrimary);
    }

    .table__class {
      width: 100%;

      .item__number {
        font-size: 0.9rem;
        color: #9e9e9e;
      }
      .sent__pickup {
        border: 1.5px solid #caa216;
        background: #fffae8;
        padding: 5px 10px;
        border-radius: 35px;
        color: #e3b718;
      }

      .delivered__pickup {
        border: 1.5px solid #80a966;
        background: #f2fbed;
        padding: 5px 10px;
        border-radius: 35px;
        color: #80a966;
      }
    }
  }

  @media (max-width: 550px) {
    .summary__wrapper {
      flex-direction: column;
      gap: 15px;
      margin-top: 10px;

      .single__summary__box {
        padding: 12px;

        .icon__wrapper {
          width: 25px;
          height: 25px;

          svg {
            width: 18px !important;
          }
        }

        .summary__text {
          gap: 2px;

          h1 {
            font-size: 1.8rem;
          }

          p {
            font-size: 1rem;
          }
        }
      }
    }

    .graph__section {
      .graph__info__wrapper {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
      }

      .graph__box {
        max-height: 220px;

        > div {
          height: 100% !important;
        }
      }
    }

    .table__section {
      margin-top: 60px;

      .recent__sale__wrapper {
        width: 100%;
        overflow-x: auto;
      }
    }
  }

  justify-content: flex-start;
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

  .title__text {
    font-size: 2rem;
  }

  .personal__details {
    border: 0.8px solid #e0e0e099;
    border-radius: 10px;
    padding: 35px 25px;

    .left__section {
      .personal__info__content {
      }
    }

    .right__section {
      .status__text {
        font-size: 0.9rem;
        color: #bbbbbb;

        span {
          color: #55d352;
        }
      }

      .seller__image {
        width: 250px;
        max-height: 300px;
        object-fit: cover;
        border-radius: 10px;
      }
    }

    @media (max-width: 550px) {
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      flex-direction: column-reverse;
      padding: 20px 10px;
      gap: 25px;

      .left__section {
        width: 100%;
      }

      .right__section {
        width: 100%;
        align-items: flex-start;
      }
    }
  }

  .business__details {
    border: 0.8px solid #e0e0e099;
    border-radius: 10px;
    padding: 35px 25px;
    gap: 35px;
    max-width: 70%;

    .gov__identification {
      max-height: 340px;

      .img__wrapper {
        width: 100%;
        height: 250px;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        padding: 10px;
        display: flex;
        justify-content: center;

        img {
          height: 100%;
          max-width: 100%;
        }
      }
    }

    @media (max-width: 550px) {
      width: 100%;
      max-width: 100%;
    }
  }

  .bank__details {
    border: 0.8px solid #e0e0e099;
    border-radius: 10px;
    padding: 35px 25px;
    gap: 35px;
  }

.report__section {
  margin: 40px 0 40px 0;
  background_color:red;
}

.report__box p:nth-child(1) {
  font-size: 2rem;
  font-weight 400;
}

.product__info > p {
margin-top: 20px;
margin-bottom: 10px;
}

.product__report__section p:nth-child(1) {
  font-size: 2rem;
  font-weight 400;
}

.product__report__section > p:nth-child(2) {
  margin-bottom: 2rem;
} 
  
`;

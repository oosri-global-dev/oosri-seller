import styled from "styled-components";

export const CreateProductPageWrapper=styled.div`
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

.container_wrapper{
 flex-wrap:nowrap;
}

.product__item{
  display:flex;
  align-items:start;
  flex-direction:column;
  width:50%;

  div{
  }
    label{

    }
}

button{
    background-color:var(--oosriPrimary);
    color:var(--oosriWhite);
}
    
.img__upload{
  gap:24px;
  .upload__container{
   background-color:transparent !important;
   border-style:dashed !important;
   padding:12px 20px;
   height:150px !important;
   
   
   .main__text{
    color:#777777 !important;
    font-size:12px !important;
    }
    svg{
      width:12px !important;
      height:12px !important;
      fill:#777777 !important;
      }
    }
}
    .column_item{
      .upload__container{
        height:50% !important;
      }
    }


`
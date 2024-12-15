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
`
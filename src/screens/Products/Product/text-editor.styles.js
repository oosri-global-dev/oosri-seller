import styled from "styled-components";

export const EditorWrapper = styled.div`
  margin-bottom: 24px;
  width: 100%; /* Force 100% to fit container, ignoring potential bad props */

  .quill {
    background: transparent;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
  }

  .ql-toolbar.ql-snow {
    border: 1px solid #E0DED3;
    border-bottom: 1px solid #E0DED3;
    border-radius: 8px 8px 0 0;
    background: #FAFAFA;
    padding: 12px;
    
    button {
      margin-right: 8px;
      &:hover {
        color: var(--oosriPrimary, #FC5353); 
        .ql-stroke {
          stroke: var(--oosriPrimary, #FC5353);
        }
        .ql-fill {
           fill: var(--oosriPrimary, #FC5353);
        }
      }
      
      &.ql-active {
        .ql-stroke {
          stroke: var(--oosriPrimary, #FC5353);
        }
        .ql-fill {
           fill: var(--oosriPrimary, #FC5353);
        }
      }
    }
  }

  .ql-container.ql-snow {
    border: 1px solid #E0DED3;
    border-top: none;
    border-radius: 0 0 8px 8px;
    background: #FAFAFA;
    font-family: 'Inter', sans-serif;
    min-height: 150px;
    font-size: 13px;
    color: #000;
  }

  .ql-editor {
    min-height: 150px;
    font-family: 'Inter', sans-serif;
    padding: 16px;
    
    &.ql-blank::before {
      font-style: normal;
      left: 16px;
      color: #bfbfbf; /* Placeholder color */
    }
  }
`;

import styled from "styled-components";
import { Button } from "antd";

export default styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    ![
      "width",
      "maxWidth",
      "margin",
      "height",
      "padding",
      "borderColor",
      "border",
      "backgroundColor",
      "radius",
      "boxShadow",
      "opacity",
      "color",
      "fontSize",
      "hoverBg",
      "hoverBorderColor",
      "hoverColor",
    ].includes(prop),
})`
  width: ${({ width }) => width || "max-content"};
  width: ${({ maxWidth }) => maxWidth && maxWidth};
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height || "40px"};
  min-height: ${({ height }) => height || "40px"};
  padding: ${({ padding }) => (padding ? padding : "0px 20px")};
  border-color: ${({ borderColor }) => borderColor || "transparent"};
  border: ${({ border }) => border || "1px solid transparent"};
  background: ${({ backgroundColor }) => backgroundColor || "transparent"};
  border-radius: ${({ radius }) => radius || "8px"};
  box-shadow: ${({ boxShadow }) => boxShadow || "none"} !important;
  opacity: ${({ opacity }) => opacity || "1"};
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ color }) => color || "var(--oosriBlack)"};
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || "13px"};

  &:hover,
  &:focus,
  &:active,
  &:not(:disabled):active,
  &:not(:disabled):focus {
    background: ${({ hoverBg }) => hoverBg || "var(--oosriPrimary)"} !important;
    border-color: ${({ hoverBg, hoverBorderColor, borderColor }) =>
      hoverBorderColor
        ? hoverBorderColor
        : hoverBg
        ? hoverBg
        : borderColor || "var(--oosriPrimary)"} !important;
    color: ${({ hoverColor }) =>
      hoverColor || "var(--oosriWhite)"} !important;
    box-shadow: none !important;
    outline: none !important;
  }

  @media (max-width: 350px) {
    height: ${({ height }) => height === "68px" && "50px"};
  }

  svg {
    font-size: 11px;
    color: inherit;
    margin: 0 0 -2px 4px;
    transition: all 0.2s ease;
  }
`;

import { cssVar, defineStyle, defineStyleConfig } from "@chakra-ui/react";
const $arrowBg = cssVar("popper-arrow-bg");

const baseStyle = defineStyle({
  border: "1px",
  bg: "paper",
  color: "heading",
  borderColor: "border",
  rounded: "md",
  shadow: "sm",
});

export const tooltipTheme = defineStyleConfig({
  baseStyle,
});

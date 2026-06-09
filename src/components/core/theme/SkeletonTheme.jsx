import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const base = defineStyle({
  _light: {
    [$startColor.variable]: "colors.zinc.100", //changing startColor to red.100
    [$endColor.variable]: "colors.zinc.400", // changing endColor to red.400
  },
  _dark: {
    [$startColor.variable]: "colors.zinc.900", //changing startColor to red.800
    [$endColor.variable]: "colors.zinc.600", // changing endColor to red.600
  },
});
export const skeletonTheme = defineStyleConfig({
  baseStyle: base,
  variants: { base },
});

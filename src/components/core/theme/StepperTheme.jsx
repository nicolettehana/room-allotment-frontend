import { stepperAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // select the indicator part
  indicator: {
    border: "2px",
    borderColor: "zinc.300",

    "&[data-status=complete]": {
      bg: "brand.600",
      borderColor: "brand.300",
    },

    "&[data-status=active]": {
      borderColor: "brand.600",
    },
  },

  description: {
    color: "body",
  },

  separator: {
    "&[data-status=complete]": {
      bg: "brand.600",
    },

    "&[data-status=active]": {
      borderColor: "zinc.300",
    },
  },
});

export const stepperTheme = defineMultiStyleConfig({
  baseStyle,
});

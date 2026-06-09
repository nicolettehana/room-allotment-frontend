import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    _light: {
      border: "2px",
      borderColor: "zinc.300",

      _checked: {
        borderColor: "brand.600",
        bg: "brand.600",
      },

      _focusVisible: {
        ring: 2,
        ringColor: "brand.600",
        ringOffset: "2px",
      },
    },

    _dark: {
      borderColor: "zinc.700",

      _checked: {
        borderColor: "brand.600",
        bg: "brand.600",
      },

      _focusVisible: {
        ring: 2,
        ringColor: "brand.600",
        ringOffset: "2px",
        ringOffsetColor: "zinc.950",
      },
    },
  },
});

export const radioTheme = defineMultiStyleConfig({ baseStyle });

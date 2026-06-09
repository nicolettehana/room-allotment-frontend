import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    padding: 1,
    borderRadius: 3,
    borderColor: "border",
    _checked: {
      borderColor: "brand.600",
      bg: "brand.600",
    },
    _focus: {
      ring: 2,
      ringColor: "brand.600",
      ringOffset: "2px",
      ringOffsetColor: "white",
    },

    // Dark Theme
    _dark: {
      borderColor: "brand.600",
      _checked: {
        borderColor: "border",
        bg: "brand.600",
      },
      _focus: {
        ring: 2,
        ringColor: "brand.600",
        ringOffset: "2px",
        ringOffsetColor: "background",
      },
    },
  },
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });

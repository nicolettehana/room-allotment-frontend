import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: "blackAlpha.700",
    backdropFilter: "auto",
    backdropBlur: "md",
    backdropSaturate: "180%",
  },

  dialog: {
    _dark: {
      bg: "zinc.900",
    },
  },

  closeButton: {
    _light: {
      _focusVisible: {
        ring: 2,
        ringColor: "brand.600",
        ringOffset: "2px",
      },
    },

    _dark: {
      _focusVisible: {
        ring: 2,
        ringColor: "brand.600",
        ringOffset: "2px",
        ringOffsetColor: "zinc.900",
      },
    },
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});

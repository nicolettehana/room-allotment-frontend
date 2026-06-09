import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const brand = definePartsStyle({
  field: {
    border: "1px",
    bg: "transparent",

    _light: {
      borderColor: "zinc.300",
      shadow: "sm",

      _placeholder: {
        color: "zinc.400",
      },

      _focus: {
        borderColor: "lgreen.900",
        outline: true,
        outlineWidth: 1,
        outlineColor: "lgreen.900",
        outlineOffset: 0,
      },

      _invalid: {
        borderColor: "red.600",
        outline: true,
        outlineWidth: 1,
        outlineColor: "red.600",
        outlineOffset: 0,
      },
    },

    _dark: {
      borderColor: "zinc.700",
      shadow: "sm",

      _placeholder: {
        color: "zinc.600",
      },

      _focus: {
        borderColor: "lgreen.600",
        outline: true,
        outlineWidth: 1,
        outlineColor: "lgreen.600",
        outlineOffset: 0,
      },

      _invalid: {
        borderColor: "red.500",
        outline: true,
        outlineWidth: 1,
        outlineColor: "red.500",
        outlineOffset: 0,
      },
    },
  },

  addon: {
    _light: {
      border: "1px solid",
      borderColor: "zinc.200",
      background: "zinc.200",
      borderRadius: "full",
      color: "zinc.500",
    },

    _dark: {
      border: "1px solid",
      borderColor: "zinc.800",
      background: "zinc.800",
      borderRadius: "full",
      color: "zinc.500",
    },
  },
});

const file = definePartsStyle({
  field: {
    p: 0,
    h: 4,
  },
});

export const inputTheme = defineMultiStyleConfig({
  baseStyle: brand,
  defaultProps: {
    variant: brand,
  },
  variants: { brand, file },
});

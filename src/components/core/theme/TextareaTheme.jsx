import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const brand = defineStyle({
  border: "1px solid",

  _light: {
    borderColor: "zinc.300",
    shadow: "sm",

    _placeholder: {
      color: "zinc.400",
    },

    _focus: {
      borderColor: "brand.600",
      outline: true,
      outlineWidth: 1,
      outlineColor: "brand.600",
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

  // Let's also provide dark mode alternatives
  _dark: {
    borderColor: "zinc.700",

    _placeholder: {
      color: "zinc.600",
    },

    _focus: {
      borderColor: "brand.600",
      outline: true,
      outlineWidth: 1,
      outlineColor: "brand.600",
      outlineOffset: 0,
    },

    _invalid: {
      borderColor: "red.300",
      outline: true,
      outlineWidth: 1,
      outlineColor: "red.300",
      outlineOffset: 0,
    },
  },
});

export const textareaTheme = defineStyleConfig({
  baseStyle: brand,
  variants: { brand },
});

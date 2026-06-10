import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const brand = defineStyle({
  fontWeight: "medium",

  _light: {
    bg: "brown.800",
    color: "zinc.50",

    _hover: {
      bg: "brown.600",
    },

    _active: {
      bg: "lgreen.800",
    },

    _focusVisible: {
      ring: 2,
      ringColor: "brand.700",
      ringOffset: "2px",
    },

    _loading: {
      opacity: 0.7,
    },
  },

  _dark: {
    bg: "zinc.500",
    color: "zinc.50",

    _hover: {
      bg: "zinc.800",
    },

    _active: {
      bg: "brand.800",
    },

    _focusVisible: {
      ring: 2,
      ringColor: "brand.700",
      ringOffset: "2px",
      ringOffsetColor: "zinc.950",
    },

    _loading: {
      opacity: 0.7,
    },
  },
});

const ghost = defineStyle({
  fontWeight: "medium",

  _light: {
    _hover: {
      bg: "blackAlpha.200",
    },

    _active: {
      bg: "blackAlpha.300",
    },
  },

  _dark: {
    _hover: {
      bg: "whiteAlpha.200",
    },

    _active: {
      bg: "whiteAlpha.300",
    },
  },

  _focusVisible: {
    ring: 2,
    ringColor: "brand.600",
    ringOffset: "2px",
  },
});

const link = defineStyle({
  _light: {
    color: "brand.600",
  },

  _dark: {
    color: "brand.600",
  },
});

const outline = defineStyle({
  fontWeight: "medium",
  borderColor: "border",

  _light: {
    shadow: "sm",

    _hover: {
      bg: "zinc.100",
    },

    _active: {
      bg: "zinc.200",
    },

    _focusVisible: {
      ring: 2,
      ringColor: "brand.600",
      ringOffset: "2px",
    },

    _disabled: {
      opacity: 1,
      color: "zinc.500",
    },
  },

  _dark: {
    _hover: {
      bg: "zinc.900",
    },

    _active: {
      bg: "zinc.800",
    },

    _focusVisible: {
      ring: 2,
      ringColor: "brand.600",
      ringOffset: "2px",
      ringOffsetColor: "zinc.950",
    },

    _disabled: {
      opacity: 1,
      color: "zinc.500",
    },
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { brand, ghost, link, outline },
});

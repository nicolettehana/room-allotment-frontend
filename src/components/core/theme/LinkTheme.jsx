import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const logo = defineStyle({
  fontWeight: "semibold",
  color: "heading",
  _hover: {
    color: "brand.600",
  },
  _focusVisible: {
    ring: 2,
    ringColor: "brand.600",
  },
});

const links = defineStyle({
  fontWeight: "semibold",
  color: "brand.600",
  _hover: {
    color: "brand.700",
  },
  _focusVisible: {
    ring: 2,
    ringColor: "brand.600",
  },
});

const nav = defineStyle({
  color: "zinc.700",
  fontWeight: "semibold",

  _hover: {
    color: "zinc.800",
  },

  _focusVisible: {
    ring: 2,
    ringColor: "brand.600",
  },

  _activeLink: {
    color: "brand.600",
  },

  // let's also provide dark mode alternatives
  _dark: {
    color: "zinc.300",
    _hover: {
      color: "zinc.50",
    },
    _focusVisible: {
      ring: 2,
      ringColor: "brand.600",
    },
    _activeLink: {
      color: "brand.600",
    },
  },
});

const sidebar = defineStyle({
  //color: "body",
  color: "white",
  fontWeight: "normal",
  px: 3,
  py: 2,
  rounded: "md",
  fontSize: "md",

  _light: {
    _hover: {
      bg: "zinc.200",
      color: "zinc.950",
      textDecoration: "none",
    },

    _focusVisible: {
      ring: 2,
      ringColor: "brand.600",
    },

    _activeLink: {
      bg: "white", //Hazel
      color: "brand.900",
    },
  },

  // let's also provide dark mode alternatives
  _dark: {
    _hover: {
      bg: "zinc.800",
      color: "zinc.50",
      textDecoration: "none",
    },

    _focusVisible: {
      ring: 2,
      ringColor: "brand.600",
    },

    _activeLink: {
      bg: "brand.600",
      color: "white",
    },
  },
});

export const linkTheme = defineStyleConfig({
  baseStyle: links,
  variants: { logo, links, nav, sidebar },
});

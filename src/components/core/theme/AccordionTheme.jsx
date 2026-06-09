import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    border: 0, // change the backgroundColor of the container
  },

  button: {
    fontWeight: "bold",
    _expanded: {
      bg: "brand.600",
      color: "zinc.100",
    },
  },

  panel: {
    color: "body",
  },
});

export const accordionTheme = defineMultiStyleConfig({ baseStyle });

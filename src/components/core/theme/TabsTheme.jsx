import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  root: {},

  tablist: {
    _light: {
      borderBottom: "1px",
      borderColor: "zinc.300",
    },

    _dark: {
      borderBottom: "1px",
      borderColor: "zinc.700",
    },
  },

  tab: {
    roundedTop: "md",
    cursor: "pointer",

    _light: {
      _selected: {
        bg: "lgreen.950",
        fontWeight: "bold",
        color: "lgreen.50",
      },
      bg:"lgreen.50",
      fontWeight: "bold",
      color: "lgreen.950",
      border: "1px",
      borderColor: "zinc.300",
      marginLeft:"1px",
    },

    _dark: {
      _selected: {
        bg: "brand.950",
        fontWeight: "bold",
        color: "brand.600",
      },
    },
  },
  tabpanel: {},
});

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle });

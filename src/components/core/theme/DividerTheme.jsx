import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  borderWidth: "1px", // change the width of the border
  my: 2,
  _light: {
    borderColor: "zinc.300",
  },

  _brand: {
    borderColor: "zinc.700",
  },
});

export const dividerTheme = defineStyleConfig({
  baseStyle,
});

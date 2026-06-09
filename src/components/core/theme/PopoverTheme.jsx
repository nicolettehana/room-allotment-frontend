import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle({
  // define the part you're going to style
  content: {
    bg: "paper",
    borderColor: "border",
    shadow: "sm",
  },
});
export const popoverTheme = defineMultiStyleConfig({ baseStyle });

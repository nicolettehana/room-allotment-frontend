import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  list: {
    // this will style the MenuList component
    p: 1,
    borderColor: "border",
    bg: "paper",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    borderRadius: 3,

    _light: {
      _focus: {
        bg: "blackAlpha.100",
      },
      _active: {
        bg: "blackAlpha.200",
      },
    },

    // dark mode
    _dark: {
      bg: "zinc.900",
      // _hover: {
      //   bg: "blackAlpha.400",
      // },
      _focus: {
        bg: "blackAlpha.400",
      },
      _active: {
        bg: "blackAlpha.500",
      },
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    // textTransform: "uppercase",
    // color: "white",
    // textAlign: "center",
    // letterSpacing: "wider",
    // opacity: "0.7",
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    // opacity: "0.8",
    // fontFamily: "mono",
    // fontSize: "sm",
    // letterSpacing: "tighter",
    // pl: "4",
  },
  divider: {
    // this will style the MenuDivider component
    // my: "4",
    // borderColor: "white",
    // borderBottom: "2px dotted",
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });

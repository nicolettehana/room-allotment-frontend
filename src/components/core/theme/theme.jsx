import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { menuTheme } from "./MenuTheme";
import { inputTheme } from "./InputTheme";
import { buttonTheme } from "./ButtonTheme";
import { checkboxTheme } from "./CheckBoxTheme";
import { linkTheme } from "./LinkTheme";
import { dividerTheme } from "./DividerTheme";
import { modalTheme } from "./ModalTheme";
import { tooltipTheme } from "./TooltipTheme";
import { textareaTheme } from "./TextareaTheme";
import { radioTheme } from "./RadioTheme";
import { tabsTheme } from "./TabsTheme";
import { accordionTheme } from "./AccordionTheme";
import { drawerTheme } from "./DrawerTheme";
import { skeletonTheme } from "./SkeletonTheme";
import { stepperTheme } from "./StepperTheme";
import { tableTheme } from "./TableTheme";
import { popoverTheme } from "./PopoverTheme";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  colors: {
    gradient: "linear-gradient(red, pink)",

    // Blue
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },

    // Orange
    orange: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
      950: "#431407",
    },

    // Green
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16",
    },

    // L Green
    lgreen: {
      50: "rgb(233, 244, 241)",
      100: "#e5f7f4",
      200: "#c6dbda",
      300: "#8fCACA",
      400: "#cce2cb",
      500: "#3bf6ae",
      600: "#25eb8b",
      700: "#1dd88a",
      800: "#97c1a9",
      900: "#1e8a54",
      950: "#175434",
    },

    // Teal
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
      950: "#042f2e",
    },

    // Red
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a",
    },

    // Zinc
    zinc: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
      950: "#09090b",
    },

    // Indigo
    indigo: {
      50: "##eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
      950: "#1e1b4b",
    },

    // Cyan
    brand: {
      50: "#f2f9fd",
      100: "#e3f2fb",
      200: "#c2e6f5",
      300: "#8cd2ed",
      400: "#4ebae2",
      500: "#27a1d0",
      600: "#1983b0",
      700: "#15678d",
      800: "#165976",
      900: "#174a63",
      950: "#102f41",
    },
  },
  components: {
    Accordion: accordionTheme,
    Button: buttonTheme,
    Checkbox: checkboxTheme,
    Divider: dividerTheme,
    Drawer: drawerTheme,
    Input: inputTheme,
    Link: linkTheme,
    Menu: menuTheme,
    Modal: modalTheme,
    Popover: popoverTheme,
    Radio: radioTheme,
    Select: inputTheme,
    Skeleton: skeletonTheme,
    Stepper: stepperTheme,
    Table: tableTheme,
    Tabs: tabsTheme,
    Textarea: textareaTheme,
    Tooltip: tooltipTheme,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "zinc.950")(props),
        color: mode("zinc.950", "zinc.50")(props),
      },
    }),
  },
  fonts: {
    heading: `'Plus Jakarta Sans Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
  semanticTokens: {
    colors: {
      heading: {
        default: "zinc.900",
        _dark: "zinc.100",
      },
      body: {
        default: "zinc.600",
        _dark: "zinc.400",
      },
      background: {
        default: "white",
        _dark: "zinc.950",
      },
      paper: {
        default: "white",
        _dark: "zinc.900",
      },
      paperSecondary: {
        default: "zinc.100",
        _dark: "zinc.900",
      },
      onPaper: {
        default: "zinc.100",
        _dark: "zinc.950",
      },
      border: {
        default: "zinc.300",
        _dark: "zinc.700",
      },
    },
  },
});

export default theme;

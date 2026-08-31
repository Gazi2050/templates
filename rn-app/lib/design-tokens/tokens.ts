import type { ThemeTokens } from "./types";

const primitives = {
  primary: {
    50: "#FEF9E9",
    100: "#FDF2D2",
    200: "#FBE7AC",
    300: "#F8DA86",
    400: "#F5CC63",
    500: "#F4D9A6",
    600: "#DCBE8A",
    700: "#B8976C",
    800: "#8F7352",
    900: "#665038",
  },
  secondary: {
    50: "#EEF0FB",
    100: "#DEE2F8",
    200: "#C7CDF2",
    300: "#AEB8EB",
    400: "#95A2E3",
    500: "#3D3D52",
    600: "#35384B",
    700: "#2A2E44",
    800: "#20243B",
    900: "#171A31",
  },
  tertiary: {
    50: "#F1F4FF",
    100: "#E3E8FF",
    200: "#D3DBFD",
    300: "#BFC8F5",
    400: "#AAB5EC",
    500: "#939FD8",
    600: "#7E8BC1",
    700: "#6977AA",
    800: "#556493",
    900: "#44517A",
  },
  neutral: {
    50: "#F7F8FC",
    100: "#EDEFF6",
    200: "#DBDFEA",
    300: "#C3C9D9",
    400: "#A8AFC6",
    500: "#8D95AF",
    600: "#737B98",
    700: "#5B637E",
    800: "#3B4260",
    900: "#2A2A3E",
  },
} as const;

const typography = {
  fontFamily: {
    headline: "Manrope",
    body: "Inter",
    label: "Inter",
  },
  fontSize: {
    headline: "32px",
    body: "16px",
    label: "14px",
  },
  lineHeight: {
    headline: "40px",
    body: "24px",
    label: "20px",
  },
  letterSpacing: {
    headline: "-0.4px",
    body: "0px",
    label: "0.1px",
  },
} as const;

const lightSemantic = {
  bg: {
    canvas: "#F7F8FC",
    surface: "#FFFFFF",
    elevated: "#EEF0FB",
    muted: "#E3E8FF",
    inverse: "#171A31",
  },
  text: {
    primary: "#171A31",
    secondary: "#3D3D52",
    muted: "#5B637E",
    inverse: "#F7F8FC",
    accent: "#8F7352",
  },
  border: {
    subtle: "#EDEFF6",
    default: "#DBDFEA",
    strong: "#A8AFC6",
    accent: "#DCBE8A",
  },
  action: {
    primary: {
      bg: "#F4D9A6",
      text: "#171A31",
      border: "#F4D9A6",
    },
    secondary: {
      bg: "#EDEFF6",
      text: "#2A2A3E",
      border: "#DBDFEA",
    },
    inverted: {
      bg: "#171A31",
      text: "#F7F8FC",
      border: "#171A31",
    },
  },
  feedback: {
    success: "#34C759",
    warning: "#FF9F0A",
    danger: "#FF6B6B",
    info: "#4D7CFE",
  },
} as const;

const darkSemantic = {
  bg: {
    canvas: "#0F1223",
    surface: "#171A31",
    elevated: "#20243B",
    muted: "#2A2E44",
    inverse: "#F7F8FC",
  },
  text: {
    primary: "#F7F8FC",
    secondary: "#D3DBFD",
    muted: "#A8AFC6",
    inverse: "#171A31",
    accent: "#F4D9A6",
  },
  border: {
    subtle: "#2A2E44",
    default: "#3B4260",
    strong: "#5B637E",
    accent: "#F4D9A6",
  },
  action: {
    primary: {
      bg: "#F4D9A6",
      text: "#171A31",
      border: "#F4D9A6",
    },
    secondary: {
      bg: "#2A2E44",
      text: "#F7F8FC",
      border: "#3B4260",
    },
    inverted: {
      bg: "#F7F8FC",
      text: "#171A31",
      border: "#F7F8FC",
    },
  },
  feedback: {
    success: "#30D158",
    warning: "#FFD60A",
    danger: "#FF453A",
    info: "#0A84FF",
  },
} as const;

export const themeTokens: Record<"light" | "dark", ThemeTokens> = {
  light: {
    primitives,
    semantic: lightSemantic,
    typography,
  },
  dark: {
    primitives,
    semantic: darkSemantic,
    typography,
  },
};

export const semanticTokenNames = {
  bg: ["canvas", "surface", "elevated", "muted", "inverse"],
  text: ["primary", "secondary", "muted", "inverse", "accent"],
  border: ["subtle", "default", "strong", "accent"],
  action: ["primary", "secondary", "inverted"],
  feedback: ["success", "warning", "danger", "info"],
} as const;

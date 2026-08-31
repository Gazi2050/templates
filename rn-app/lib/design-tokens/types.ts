export type ThemeMode = "light" | "dark";

export type PrimitiveScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type PrimitivePalette = {
  primary: PrimitiveScale;
  secondary: PrimitiveScale;
  tertiary: PrimitiveScale;
  neutral: PrimitiveScale;
};

export type SemanticColors = {
  bg: {
    canvas: string;
    surface: string;
    elevated: string;
    muted: string;
    inverse: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    accent: string;
  };
  border: {
    subtle: string;
    default: string;
    strong: string;
    accent: string;
  };
  action: {
    primary: {
      bg: string;
      text: string;
      border: string;
    };
    secondary: {
      bg: string;
      text: string;
      border: string;
    };
    inverted: {
      bg: string;
      text: string;
      border: string;
    };
  };
  feedback: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
};

export type ThemeTypography = {
  fontFamily: {
    headline: string;
    body: string;
    label: string;
  };
  fontSize: {
    headline: string;
    body: string;
    label: string;
  };
  lineHeight: {
    headline: string;
    body: string;
    label: string;
  };
  letterSpacing: {
    headline: string;
    body: string;
    label: string;
  };
};

export type ThemeTokens = {
  primitives: PrimitivePalette;
  semantic: SemanticColors;
  typography: ThemeTypography;
};

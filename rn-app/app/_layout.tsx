import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeProvider } from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { NAV_THEME } from "@/lib/theme";
import "./global.css";

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const scheme = colorScheme === "light" ? "light" : "dark";

  useEffect(() => {
    if (!colorScheme) {
      setColorScheme("dark");
    }
  }, [colorScheme, setColorScheme]);

  return (
    <ThemeProvider value={NAV_THEME[scheme]}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </ThemeProvider>
  );
}

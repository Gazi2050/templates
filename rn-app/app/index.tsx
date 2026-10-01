import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export default function Index() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme !== "light";

  const handleToggleTheme = () => {
    setColorScheme(isDark ? "light" : "dark");
  };

  return (
    <View
      className={`flex-1 items-center justify-center px-6 ${
        isDark ? "bg-primitive-secondary-900" : "bg-primitive-neutral-50"
      }`}
    >
      <View
        className={`w-full max-w-sm rounded-2xl border p-6 ${
          isDark
            ? "border-primitive-secondary-700 bg-primitive-secondary-800"
            : "border-primitive-neutral-200 bg-white"
        }`}
      >
        <Text
          className={`font-headline text-headline ${
            isDark
              ? "text-primitive-neutral-50"
              : "text-primitive-secondary-900"
          }`}
        >
          Mobile app
        </Text>
        <Text
          className={`mt-3 font-body text-body ${
            isDark
              ? "text-primitive-tertiary-200"
              : "text-primitive-secondary-500"
          }`}
        >
          Current mode: {isDark ? "dark" : "light"}
        </Text>

        <Button
          onPress={handleToggleTheme}
          className={`mt-6 self-start rounded-full border px-5 py-2 ${
            isDark
              ? "border-primitive-primary-500 bg-primitive-primary-500"
              : "border-primitive-secondary-800 bg-primitive-secondary-800"
          }`}
        >
          <Text
            className={`font-label text-label ${
              isDark
                ? "text-primitive-secondary-900"
                : "text-primitive-neutral-50"
            }`}
          >
            Toggle to {isDark ? "light" : "dark"}
          </Text>
        </Button>
      </View>
    </View>
  );
}

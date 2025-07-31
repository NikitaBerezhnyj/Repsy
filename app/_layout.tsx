import { useLoadAssets } from "@/hooks/useLoadAssets";
import "@/translation/i18n";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const ready = useLoadAssets();
  const { colors } = useTheme();

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(stack)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}

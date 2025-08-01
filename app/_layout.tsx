import { useInitializeApp } from "@/hooks/useInitializeApp";
import { useLoadAssets } from "@/hooks/useLoadAssets";
import { colors } from "@/theme";
import "@/translation/i18n";
import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const assetsReady = useLoadAssets();
  const appReady = useInitializeApp();

  if (!assetsReady || !appReady) {
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

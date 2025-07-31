import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}
    >
      <Stack.Screen name="program/[id]" />
      <Stack.Screen name="exercises" />
      <Stack.Screen name="session/[id]" />
      <Stack.Screen name="session-complete" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}

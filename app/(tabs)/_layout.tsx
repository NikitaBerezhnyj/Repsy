import { usePremium } from "@/hooks/usePremium";
import { colors, sizes, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const isPremium = usePremium();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabIconActive,
        tabBarInactiveTintColor: colors.tabIconInactive,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: insets.bottom + spacing.xl,
          paddingTop: spacing.sm,
          height: Platform.OS === "ios" ? 80 + insets.bottom : 70,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4
            },
            android: {
              elevation: 8
            }
          })
        },
        tabBarLabelStyle: {
          fontSize: sizes.xs,
          fontWeight: "500"
        },
        animation: "shift"
      }}
    >
      <Tabs.Screen
        name="calendar"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "calendar" : "calendar-outline"} size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={24}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="donate"
        options={{
          title: "",
          href: isPremium ? null : "/donate",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "gift" : "gift-outline"} size={24} color={color} />
          )
        }}
      />
    </Tabs>
  );
}

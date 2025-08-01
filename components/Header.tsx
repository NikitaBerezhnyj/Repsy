import { Title } from "@/components/ui/Title";
import { colors, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const goHome = () => {
    router.push("/(tabs)");
  };

  const openSettings = () => {
    router.push("/(stack)/settings");
  };

  const goBack = () => {
    router.back();
  };

  return (
    <View style={{ zIndex: 10, marginBottom: spacing.md, paddingTop: insets.top }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.surface,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8
            },
            android: {
              elevation: 4
            }
          })
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          minHeight: 60
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {showBackButton ? (
            <TouchableOpacity
              onPress={goBack}
              style={{ marginRight: spacing.md }}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color={colors.icon} />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity onPress={goHome} activeOpacity={0.7}>
            <Title style={{ letterSpacing: -0.5 }}>Repsy</Title>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colors.surface,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: spacing.sm,
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2
              },
              android: {
                elevation: 1
              }
            })
          }}
          onPress={openSettings}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: colors.border,
          opacity: 0.5
        }}
      />
    </View>
  );
}

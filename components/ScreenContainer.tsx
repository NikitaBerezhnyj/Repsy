import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, Platform, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Title } from "./ui/Title";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ScreenContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  animationType?: "slide" | "fade" | "spring";
  direction?: "left" | "right";
  showHeader?: boolean;
  title?: string;
}

export default function ScreenContainer({
  children,
  backgroundColor,
  animationType = "spring",
  direction = "right",
  showHeader = true
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH);
  const scale = useSharedValue(0.95);
  const router = useRouter();
  const { colors, spacing } = useTheme();

  const bgColor = backgroundColor || colors.background;

  useEffect(() => {
    if (animationType === "fade") {
      opacity.value = withTiming(1, { duration: 300 });
    } else if (animationType === "spring") {
      opacity.value = withSpring(1);
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90
      });
      scale.value = withSpring(1, {
        damping: 20,
        stiffness: 90
      });
    } else {
      opacity.value = withTiming(1, { duration: 250 });
      translateX.value = withTiming(0, { duration: 250 });
    }
  }, [animationType, opacity, scale, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { scale: scale.value }]
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  const openSettings = () => {
    router.push("/(stack)/settings");
  };

  const goHome = () => {
    router.push("/(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar barStyle="light-content" backgroundColor={bgColor} />

      {showHeader && (
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
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              onPress={goHome}
              activeOpacity={0.7}
            >
              <Title
                style={{
                  letterSpacing: -0.5
                }}
              >
                Repsy
              </Title>
            </TouchableOpacity>

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
      )}

      <Animated.View
        style={[
          {
            flex: 1,
            paddingHorizontal: spacing.lg,
            paddingBottom: insets.bottom
          },
          animationType === "fade" ? fadeStyle : animatedStyle
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </Animated.View>
    </View>
  );
}

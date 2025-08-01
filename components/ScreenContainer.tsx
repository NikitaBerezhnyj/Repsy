import { colors, spacing } from "@/theme";
import React, { useEffect } from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { Header } from "./Header";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ScreenContainerProps {
  children: React.ReactNode;
  animationType?: "slide" | "fade" | "spring";
  showBackButton?: boolean;
}

export default function ScreenContainer({
  children,
  animationType = "spring",
  showBackButton = false
}: ScreenContainerProps) {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(SCREEN_WIDTH);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    if (animationType === "fade") {
      opacity.value = withTiming(1, { duration: 300 });
    } else if (animationType === "spring") {
      opacity.value = withSpring(1);
      translateX.value = withSpring(0, { damping: 20, stiffness: 90 });
      scale.value = withSpring(1, { damping: 20, stiffness: 90 });
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header showBackButton={showBackButton} />
      <Animated.View
        style={[
          { flex: 1, paddingHorizontal: spacing.lg },
          animationType === "fade" ? fadeStyle : animatedStyle
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </Animated.View>
    </View>
  );
}

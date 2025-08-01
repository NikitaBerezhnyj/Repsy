import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { Title } from "@/components/ui/Title";
import { useCoachTips } from "@/hooks/useCoachTips";
import { useTheme } from "@/hooks/useTheme";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

interface CoachBreakModalProps {
  visible: boolean;
  onClose: () => void;
  timerDuration?: number;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const CoachBreakModal: React.FC<CoachBreakModalProps> = ({
  visible,
  onClose,
  timerDuration = 30
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const tip = useCoachTips(visible);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const progressAnim = React.useRef(new Animated.Value(1)).current;

  const [secondsLeft, setSecondsLeft] = React.useState(timerDuration);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true
        }),
        Animated.timing(progressAnim, {
          toValue: 0,
          duration: timerDuration * 1000,
          useNativeDriver: false
        })
      ]).start();

      setSecondsLeft(timerDuration);
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false
        })
      ]).start();
    }
  }, [visible, timerDuration, fadeAnim, scaleAnim, progressAnim]);

  useEffect(() => {
    if (!visible) return;

    setSecondsLeft(timerDuration);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, onClose, timerDuration]);

  if (!visible || !tip) {
    return null;
  }

  const progressBarWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <Animated.View
      style={[
        styles.overlay,
        { backgroundColor: colors.surface, opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
      ]}
    >
      <Title style={{ fontSize: 56, marginBottom: 16 }}>{tip.emoji}</Title>

      <Paragraph align="center">
        {t(`coachTips.${tip.category}.${tip.key}`, "Порада недоступна")}
      </Paragraph>

      <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
        <Animated.View
          style={[
            styles.progressBarFill,
            { width: progressBarWidth, backgroundColor: colors.primary }
          ]}
        />
      </View>

      <Paragraph style={[styles.timerText, { color: colors.primary }]}>
        {secondsLeft} {t("seconds_left", "секунд")}
      </Paragraph>

      <Button onPress={onClose} style={styles.closeButton} textStyle={{ fontWeight: "700" }}>
        {t("close", "Закрити")}
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 9999,
    elevation: 9999
  },
  progressBarBackground: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
    marginTop: 8
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4
  },
  timerText: {
    fontSize: 16,
    marginBottom: 24,
    fontWeight: "600"
  },
  closeButton: {
    minWidth: 120,
    paddingVertical: 12
  }
});

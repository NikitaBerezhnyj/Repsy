import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { Title } from "@/components/ui/Title";
import { useCoachTips } from "@/hooks/useCoachTips";
import { colors, sizes, spacing } from "@/theme";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";

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
  const tip = useCoachTips(visible);
  const [secondsLeft, setSecondsLeft] = useState(timerDuration);
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      setSecondsLeft(timerDuration);
    } else {
      setShowModal(false);
    }
  }, [visible, timerDuration]);

  useEffect(() => {
    if (!visible) return;

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

  if (!showModal || !tip) return null;

  const PROGRESS_BAR_WIDTH = SCREEN_WIDTH - 40;
  const progressBarWidthInPx = (secondsLeft / timerDuration) * PROGRESS_BAR_WIDTH;

  return (
    <View style={[styles.overlay, { backgroundColor: colors.surface }]}>
      <Title style={{ fontSize: sizes.xl, marginBottom: spacing.md }}>{tip.emoji}</Title>

      <Paragraph align="center">{t(`coachTips.${tip.category}.${tip.key}`)}</Paragraph>

      <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: progressBarWidthInPx,
              backgroundColor: colors.primary
            }
          ]}
        />
      </View>

      <Paragraph style={[styles.timerText, { color: colors.primary }]}>
        {secondsLeft} {t("coachTips.seconds_left")}
      </Paragraph>

      <Button onPress={onClose} style={styles.closeButton} textStyle={{ fontWeight: "700" }}>
        {t("coachTips.close")}
      </Button>
    </View>
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

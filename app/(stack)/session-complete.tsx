import { Button } from "@/components/ui/Button";
import { MoodButton } from "@/components/ui/MoodButton";
import { Paragraph } from "@/components/ui/Paragraph";
import { Subtitle } from "@/components/ui/Subtitle";
import { Title } from "@/components/ui/Title";
import { colors, spacing } from "@/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function SessionCompleteScreen() {
  const { t } = useTranslation();

  const trainingTime = 60;
  const endedEarly = false;
  const [mood, setMood] = useState<"good" | "normal" | "bad" | null>(endedEarly ? "bad" : null);

  const handleFinish = () => {
    console.log("Finish with mood:", mood);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.inner}>
        <Title align="center">{t("sessionComplete.title")}</Title>
        <Paragraph align="center">
          {t("sessionComplete.duration", { minutes: trainingTime })}
        </Paragraph>

        {!endedEarly && (
          <>
            <View style={styles.spacer} />
            <Subtitle align="center">{t("sessionComplete.howDoYouFeel")}</Subtitle>

            <View style={styles.moodRow}>
              <MoodButton
                emoji="😄"
                label={t("sessionComplete.mood.good")}
                mood="good"
                selected={mood === "good"}
                onPress={() => setMood("good")}
              />
              <MoodButton
                emoji="😐"
                label={t("sessionComplete.mood.normal")}
                mood="normal"
                selected={mood === "normal"}
                onPress={() => setMood("normal")}
              />
              <MoodButton
                emoji="😞"
                label={t("sessionComplete.mood.bad")}
                mood="bad"
                selected={mood === "bad"}
                onPress={() => setMood("bad")}
              />
            </View>
          </>
        )}

        <View style={styles.spacer} />
        <Button onPress={handleFinish}>{t("sessionComplete.finish")}</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md
  },
  inner: {
    width: "100%",
    paddingHorizontal: spacing.lg,
    gap: spacing.md
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: spacing.sm
  },
  spacer: {
    height: spacing.lg
  }
});

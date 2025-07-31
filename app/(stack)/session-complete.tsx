import { Button } from "@/components/ui/Button";
import { MoodButton } from "@/components/ui/MoodButton";
import { Paragraph } from "@/components/ui/Paragraph";
import { Subtitle } from "@/components/ui/Subtitle";
import { Title } from "@/components/ui/Title";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SessionCompleteScreen() {
  const { colors } = useTheme();
  const trainingTime = 60;
  const endedEarly = false;
  const [mood, setMood] = useState<"good" | "normal" | "bad" | null>(endedEarly ? "bad" : null);

  const handleFinish = () => {
    console.log("Finish with mood:", mood);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.inner}>
        <Title align="center">Тренування завершено</Title>
        <Paragraph align="center">Тривалість: {trainingTime} хв</Paragraph>

        {!endedEarly && (
          <>
            <View style={styles.spacer} />
            <Subtitle align="center">Як почуваєтесь?</Subtitle>

            <View style={styles.moodRow}>
              <MoodButton
                emoji="😄"
                label="Круто"
                mood="good"
                selected={mood === "good"}
                onPress={() => setMood("good")}
              />
              <MoodButton
                emoji="😐"
                label="Нормально"
                mood="normal"
                selected={mood === "normal"}
                onPress={() => setMood("normal")}
              />
              <MoodButton
                emoji="😞"
                label="Погано"
                mood="bad"
                selected={mood === "bad"}
                onPress={() => setMood("bad")}
              />
            </View>
          </>
        )}

        <View style={styles.spacer} />
        <Button onPress={handleFinish}>Завершити</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  inner: {
    width: "100%",
    paddingHorizontal: 24,
    gap: 16
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8
  },
  spacer: {
    height: 24
  }
});

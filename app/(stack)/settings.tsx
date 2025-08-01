import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { Title } from "@/components/ui/Title";

import { colors, spacing } from "@/theme";
import i18n from "@/translation/i18n";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const toggleLanguage = () => {
    const newLang = i18n.language === "uk" ? "en" : "uk";
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title align="center">⚙️ Налаштування</Title>
      <Paragraph align="center">Цей екран ще в розробці.</Paragraph>
      <Button onPress={toggleLanguage}>Змінити мову</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md
  }
});

import { Paragraph } from "@/components/ui/Paragraph";
import { Title } from "@/components/ui/Title";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title align="center">⚙️ Налаштування</Title>
      <Paragraph align="center">Цей екран ще в розробці.</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  }
});

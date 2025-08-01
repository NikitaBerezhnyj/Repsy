import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { Title } from "@/components/ui/Title";
import { colors, spacing } from "@/theme";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title align="center" style={{ marginBottom: spacing.lg }}>
        {t("notFound.title")}
      </Title>
      <Paragraph align="center" style={{ marginBottom: spacing.md }}>
        {t("notFound.description1")}
      </Paragraph>
      <Paragraph align="center" style={{ marginBottom: spacing.md }}>
        {t("notFound.description2")}
      </Paragraph>
      <Button onPress={() => router.back()} style={{ marginTop: spacing.xl }}>
        {t("notFound.back")}
      </Button>
      <Button onPress={() => router.replace("/(tabs)")} style={{ marginTop: spacing.xl }}>
        {t("notFound.home")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
    alignItems: "center"
  }
});

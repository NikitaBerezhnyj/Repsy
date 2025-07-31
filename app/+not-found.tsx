import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { Title } from "@/components/ui/Title";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title align="center" style={{ marginBottom: 20 }}>
        {t("notFound.title")}
      </Title>
      <Paragraph align="center" style={{ marginBottom: 12 }}>
        {t("notFound.description1")}
      </Paragraph>
      <Paragraph align="center" style={{ marginBottom: 12 }}>
        {t("notFound.description2")}
      </Paragraph>
      <Button onPress={() => router.back()} style={{ marginTop: 30 }}>
        {t("notFound.back")}
      </Button>
      <Button onPress={() => router.replace("/(tabs)")} style={{ marginTop: 30 }}>
        {t("notFound.home")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center"
  }
});

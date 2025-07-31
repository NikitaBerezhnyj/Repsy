import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";
import { Title } from "@/components/ui/Title";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Title align="center" style={{ marginBottom: 20 }}>
        Не знайдено
      </Title>
      <Paragraph align="center" style={{ marginBottom: 12 }}>
        Схоже ви заблукали.
      </Paragraph>
      <Paragraph align="center" style={{ marginBottom: 12 }}>
        Спробуйте повернутися назад або перейти на головну сторінку.
      </Paragraph>
      <Button onPress={() => router.back()} style={{ marginTop: 30 }}>
        Повернутись назад
      </Button>
      <Button onPress={() => router.replace("/(tabs)")} style={{ marginTop: 30 }}>
        Повернутись на головну
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A141F"
  }
});

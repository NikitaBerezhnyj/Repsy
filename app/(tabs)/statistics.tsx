import { CoachBreakModal } from "@/components/modal/CoachBreakModal";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Paragraph } from "@/components/ui/Paragraph";
import { Subtitle } from "@/components/ui/Subtitle";
import { Title } from "@/components/ui/Title";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import { useTabAnimation } from "../../hooks/useTabAnimation";

export default function StatisticsScreen() {
  const { direction } = useTabAnimation();
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [showCoachTip, setShowCoachTip] = useState(false);

  return (
    <>
      <ScreenContainer animationType="spring" direction={direction}>
        <View style={styles.container}>
          <Text style={styles.title}>Статистика</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Всього днів</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>89%</Text>
              <Text style={styles.statLabel}>Прогрес</Text>
            </View>
          </View>
          <Title>Заголовок</Title>
          <Subtitle>Заголовок</Subtitle>
          <Paragraph>Заголовок</Paragraph>
          <Label>Заголовок</Label>
          <Button
            onPress={() => {
              console.log("Button pressed");
            }}
          >
            Кнопка
          </Button>

          <Button onPress={() => setShowCoachTip(true)}>💡 Порада тренера</Button>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Checkbox
            label="Це приклад великого тексту, який переноситься на кілька рядків і закреслюється, коли вибрано чекбокс"
            checked={checked}
            onToggle={() => setChecked((prev) => !prev)}
          />
        </View>
      </ScreenContainer>
      <CoachBreakModal visible={showCoachTip} onClose={() => setShowCoachTip(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#1A141F"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 24
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8
  },
  cardContent: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20
  },
  dayCell: {
    width: "13%",
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937"
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6B35",
    marginBottom: 4
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center"
  }
});

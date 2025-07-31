import ExerciseManagerCard from "@/components/card/ExerciseManagerCard";
import ProgramCard from "@/components/card/ProgramCard";
import ProgramManagerCard from "@/components/card/ProgramManagerCard";
import ScreenContainer from "@/components/ScreenContainer";
import { Paragraph } from "@/components/ui/Paragraph";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const mockPrograms = [
  { id: 1, name: "Спліт 3д", exercises: 12 },
  { id: 2, name: "Кардіо", exercises: 8 },
  { id: 3, name: "Фулбоді", exercises: 15 },
  { id: 4, name: "Ще одна програма", exercises: 10 }
];

export default function HomeScreen() {
  const { spacing } = useTheme();

  const openExercises = () => {
    router.push("/(stack)/exercises");
  };

  const openProgramsManager = () => {
    router.push("/(stack)/programs");
  };

  const visiblePrograms = mockPrograms.slice(0, 3);

  return (
    <ScreenContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Paragraph style={{ flex: 1 }}>Мої програми</Paragraph>
            <TouchableOpacity onPress={() => router.push("/(stack)/program/new")}>
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {visiblePrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
          <ProgramManagerCard onPress={openProgramsManager} />
        </View>

        <View style={styles.section}>
          <Paragraph style={{ marginBottom: spacing.sm }}>Менеджмент</Paragraph>
          <ExerciseManagerCard onPress={openExercises} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  section: {
    marginBottom: 32
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16
  },
  startButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600"
  },
  programCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  programInfo: {
    flex: 1
  },
  programName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4
  },
  programDetails: {
    fontSize: 14,
    color: "#6B7280"
  },
  programActions: {
    flexDirection: "row",
    gap: 12
  },
  actionButton: {
    padding: 8
  },
  menuItem: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: "#374151"
  }
});

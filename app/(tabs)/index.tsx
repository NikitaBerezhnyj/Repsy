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
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const programs = [
  { id: 1, name: "Спліт 3д", exercises: 12 },
  { id: 2, name: "Кардіо", exercises: 8 },
  { id: 3, name: "Фулбоді", exercises: 15 },
  { id: 4, name: "Ще одна програма", exercises: 10 }
];

export default function HomeScreen() {
  const { spacing } = useTheme();
  const { t } = useTranslation();

  const openExercises = () => {
    router.push("/(stack)/exercises");
  };

  const openProgramsManager = () => {
    router.push("/(stack)/programs");
  };

  const visiblePrograms = programs.slice(0, 3);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Paragraph style={{ flex: 1 }}>{t("homeScreen.myPrograms")}</Paragraph>
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
          <Paragraph style={{ marginBottom: spacing.sm }}>{t("homeScreen.management")}</Paragraph>
          <ExerciseManagerCard onPress={openExercises} />
        </View>
      </View>
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
  }
});

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";

const mockPrograms = [
  { id: 1, name: "Спліт 3д", exercises: 12 },
  { id: 2, name: "Кардіо", exercises: 8 },
  { id: 3, name: "Фулбоді", exercises: 15 }
];

export default function HomeScreen() {
  const startWorkout = (sessionId: number) => {
    router.push(`/(stack)/session/${sessionId}`);
  };

  const openProgram = (programId: number) => {
    router.push(`/(stack)/program/${programId}`);
  };

  const openExercises = () => {
    router.push("/(stack)/exercises");
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Швидкий старт</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => startWorkout(mockPrograms[0]?.id)}
          >
            <Ionicons name="play" size={24} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Почати тренування</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Мої програми</Text>
            <TouchableOpacity onPress={() => router.push("/(stack)/program/new")}>
              <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          {mockPrograms.map((program) => (
            <TouchableOpacity
              key={program.id}
              style={styles.programCard}
              onPress={() => openProgram(program.id)}
            >
              <View style={styles.programInfo}>
                <Text style={styles.programName}>{program.name}</Text>
                <Text style={styles.programDetails}>{program.exercises} вправ</Text>
              </View>
              <View style={styles.programActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => startWorkout(program.id)}
                >
                  <Ionicons name="play-outline" size={20} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Менеджмент</Text>
          <TouchableOpacity style={styles.menuItem} onPress={openExercises}>
            <Ionicons name="fitness-outline" size={24} color="#6B7280" />
            <Text style={styles.menuItemText}>Управління вправами</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
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

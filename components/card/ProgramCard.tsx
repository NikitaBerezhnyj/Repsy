import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Label } from "../ui/Label";
import { Paragraph } from "../ui/Paragraph";

interface Props {
  program: {
    id: number;
    name: string;
    exercises: number;
  };
}

export default function ProgramCard({ program }: Props) {
  const { colors } = useTheme();

  const openProgram = () => {
    router.push(`/(stack)/program/${program.id}`);
  };

  const startWorkout = () => {
    router.push(`/(stack)/session/${program.id}`);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface }]}
      onPress={openProgram}
    >
      <View style={styles.info}>
        <Paragraph>{program.name}</Paragraph>
        <Label>{program.exercises} вправ</Label>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={startWorkout}>
          <Ionicons name="play-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  info: {
    flex: 1
  },
  actions: {
    flexDirection: "row"
  },
  actionButton: {
    padding: 8
  }
});

import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Label } from "../ui/Label";

type Props = {
  onPress: () => void;
};

export default function ProgramManagerCard({ onPress }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.surface }]}
      onPress={onPress}
    >
      <Label style={[styles.menuItemText, { color: colors.text }]}>Управління програмами</Label>
      <Ionicons name="list-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 12
  },
  menuItemText: {
    flex: 1
  }
});

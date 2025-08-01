import { colors, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Label } from "../ui/Label";

type Props = {
  onPress: () => void;
};

export default function ProgramManagerCard({ onPress }: Props) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.surface }]}
      onPress={onPress}
    >
      <Label style={[styles.menuItemText, { color: colors.text }]}>
        {t("homeScreen.program-management-card")}
      </Label>
      <Ionicons name="list-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: spacing.md
  },
  menuItemText: {
    flex: 1
  }
});

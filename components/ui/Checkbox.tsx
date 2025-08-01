import { colors, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Paragraph } from "./Paragraph";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onToggle }) => {
  return (
    <Pressable
      onPress={onToggle}
      style={styles.wrapper}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={styles.textContainer}>
        <Paragraph
          style={{
            textDecorationLine: checked ? "line-through" : "none",
            color: checked ? colors.textMuted : colors.text
          }}
        >
          {label}
        </Paragraph>
      </View>
      <Ionicons name={checked ? "checkbox" : "square-outline"} size={24} color={colors.primary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  textContainer: {
    flex: 1,
    paddingRight: spacing.sm
  }
});

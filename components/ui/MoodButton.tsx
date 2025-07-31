import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface MoodButtonProps {
  emoji: string;
  label: string;
  mood: "good" | "normal" | "bad";
  selected?: boolean;
  onPress: () => void;
}

export const MoodButton: React.FC<MoodButtonProps> = ({
  emoji,
  label,
  mood,
  selected = false,
  onPress
}) => {
  const getColor = () => {
    const colors = {
      good: { base: "#D4EDDA", selected: "#A5D6A7" },
      normal: { base: "#FFF3CD", selected: "#FFD54F" },
      bad: { base: "#F8D7DA", selected: "#EF9A9A" }
    };
    return selected ? colors[mood].selected : colors[mood].base;
  };

  return (
    <Pressable onPress={onPress} style={[styles.button, { backgroundColor: getColor() }]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 90,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8
  },
  emoji: {
    fontSize: 28
  },
  label: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500"
  }
});

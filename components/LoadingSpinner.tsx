import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

type LoadingSpinnerProps = {
  visible?: boolean;
};

export const LoadingSpinner = ({ visible = true }: LoadingSpinnerProps) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center"
  },
  spinnerContainer: {
    backgroundColor: "transparent",
    transform: [{ scale: 1.8 }]
  }
});

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";

export default function CalendarScreen() {
  return (
    <ScreenContainer animationType="spring">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Календар</Text>

        <View style={styles.calendarGrid}>
          {Array.from({ length: 28 }, (_, i) => (
            <View key={i} style={styles.dayCell}>
              <Text style={styles.dayText}>{i + 1}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
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

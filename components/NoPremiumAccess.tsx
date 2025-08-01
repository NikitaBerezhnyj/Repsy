import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Title } from "@/components/ui/Title";
import { colors, sizes, spacing } from "@/theme";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export const NoPremiumAccess = () => {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <Title style={styles.emoji}>🚫</Title>
      <Title align="center">Немає доступу</Title>
      <Label align="center" style={styles.text}>
        У вас немає преміуму, щоб використовувати цю функцію
      </Label>
      <Button onPress={() => router.push("/(tabs)/donate")} style={styles.button}>
        <Label style={styles.buttonText}>Купити преміум</Label>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.md
  },
  text: {
    textAlign: "center",
    marginTop: spacing.sm,
    color: colors.textMuted
  },
  button: {
    marginTop: spacing.md
  },
  buttonText: {
    color: colors.text,
    fontSize: sizes.xs
  }
});

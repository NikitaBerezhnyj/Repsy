import ScreenContainer from "@/components/ScreenContainer";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Subtitle } from "@/components/ui/Subtitle";
import { colors, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet, View } from "react-native";

function UkraineFlagIcon() {
  return (
    <View style={flagStyles.flag}>
      <View style={[flagStyles.stripe, { backgroundColor: "#005BBB" }]} />
      <View style={[flagStyles.stripe, { backgroundColor: "#FFD500" }]} />
    </View>
  );
}

const flagStyles = StyleSheet.create({
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    overflow: "hidden",
    marginRight: 8
  },
  stripe: {
    flex: 1,
    width: "100%"
  }
});

export default function DonateScreen() {
  const { t } = useTranslation();

  const openPremium = () => {
    Linking.openURL("https://buy.stripe.com/test_premium_link");
  };

  const openDonation = () => {
    Linking.openURL("https://www.buymeacoffee.com/yourusername");
  };

  const openSupportUkraine = () => {
    Linking.openURL("https://u24.gov.ua/");
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.section}>
          <Subtitle>{t("donateScreen.subtitleSupportUs")}</Subtitle>
          <Label style={{ color: colors.text, marginBottom: spacing.sm + spacing.xs }}>
            {t("donateScreen.supportMessage")}
          </Label>

          <Button
            style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs }}
            onPress={openPremium}
          >
            <Ionicons
              name="star"
              size={20}
              color={colors.text}
              style={{ marginRight: spacing.sm }}
            />
            <Label style={{ color: colors.text }}>{t("donateScreen.buyPremium")}</Label>
          </Button>

          <Button
            style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs }}
            onPress={openDonation}
          >
            <Ionicons
              name="heart"
              size={20}
              color={colors.text}
              style={{ marginRight: spacing.sm }}
            />
            <Label style={{ color: colors.text }}>{t("donateScreen.sendDonation")}</Label>
          </Button>
        </View>

        <View style={styles.section}>
          <Subtitle>{t("donateScreen.subtitleSupportUkraine")}</Subtitle>
          <Label style={{ color: colors.text, marginBottom: spacing.sm + spacing.xs }}>
            {t("donateScreen.supportUkraine")}
          </Label>

          <Button style={styles.ukraineButton} onPress={openSupportUkraine}>
            <UkraineFlagIcon />
            <Label style={styles.ukraineButtonText}>
              {t("donateScreen.supportUkraineButton", { defaultValue: "Підтримати Україну" })}
            </Label>
          </Button>
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
    marginBottom: spacing.sm
  },
  ukraineButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm + spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    backgroundColor: "#005BBB",
    shadowColor: "#FFD500",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  ukraineButtonText: {
    color: "#FFD500"
  }
});

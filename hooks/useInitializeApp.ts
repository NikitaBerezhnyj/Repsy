import { initializeDatabase } from "@/db/schema";
import i18n from "@/translation/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { useCallback, useEffect, useState } from "react";

const LANGUAGE_KEY = "user-language";

export function useInitializeApp() {
  const [ready, setReady] = useState(false);

  const initialize = useCallback(async () => {
    try {
      await initializeDatabase();

      let savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);

      if (!savedLang) {
        const deviceLang = Localization.getLocales()[0]?.languageCode || "en";
        savedLang = deviceLang.startsWith("uk") ? "uk" : "en";
        await AsyncStorage.setItem(LANGUAGE_KEY, savedLang);
      }

      await i18n.changeLanguage(savedLang);
    } catch (e) {
      console.error("Initialization error:", e);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return ready;
}

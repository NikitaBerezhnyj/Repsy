import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import uk from "./locales/uk.json";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback: (lang: string) => void) => {
    const languageCode = Localization.getLocales()[0]?.languageCode || "en";
    callback(languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      uk: { translation: uk }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

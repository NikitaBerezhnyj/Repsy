import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type TipCategory =
  | "hydration"
  | "technique"
  | "recovery"
  | "motivation"
  | "nutrition"
  | "posture"
  | "consistency"
  | "rest";

type CoachTipsTranslations = {
  [key in TipCategory]: Record<string, string>;
};

const categoryEmojis: Record<TipCategory, string> = {
  hydration: "💧",
  technique: "💪",
  recovery: "🧘‍♂️",
  motivation: "🚀",
  nutrition: "🍎",
  posture: "🧍‍♂️",
  consistency: "🔁",
  rest: "💤"
};

export function useCoachTips(refreshTrigger?: any) {
  const { i18n } = useTranslation();
  const [tip, setTip] = useState<{
    category: TipCategory;
    key: string;
    emoji: string;
  } | null>(null);

  useEffect(() => {
    const lang = i18n.language;
    const data = i18n.getDataByLanguage(lang);
    const rawTipsData = data?.translation?.coachTips;
    const tipsData = rawTipsData as unknown as CoachTipsTranslations;

    if (!tipsData) return;

    const categories = Object.keys(tipsData) as TipCategory[];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const tipsForCategory = tipsData[randomCategory];
    const tipKeys = tipsForCategory ? Object.keys(tipsForCategory) : [];

    if (tipKeys.length === 0) return;

    const randomTipKey = tipKeys[Math.floor(Math.random() * tipKeys.length)];

    setTip({
      category: randomCategory,
      key: randomTipKey,
      emoji: categoryEmojis[randomCategory]
    });
  }, [i18n.language, i18n.getDataByLanguage, i18n, refreshTrigger]);

  return tip;
}

import { usePathname } from "expo-router";
import { useEffect, useState } from "react";

type TabName = "home" | "calendar" | "statistics";

const tabOrder: TabName[] = ["home", "calendar", "statistics"];

export function useTabAnimation() {
  const pathname = usePathname();
  const [previousTab, setPreviousTab] = useState<TabName | null>(null);
  const [currentTab, setCurrentTab] = useState<TabName>("home");
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const newTab = pathname.split("/").pop() as TabName;

    if (newTab && tabOrder.includes(newTab) && newTab !== currentTab) {
      const currentIndex = tabOrder.indexOf(currentTab);
      const newIndex = tabOrder.indexOf(newTab);

      const newDirection = newIndex > currentIndex ? "right" : "left";

      setPreviousTab(currentTab);
      setCurrentTab(newTab);
      setDirection(newDirection);
    }
  }, [pathname, currentTab]);

  return {
    currentTab,
    previousTab,
    direction,
    isTransitioning: previousTab !== null && previousTab !== currentTab
  };
}

export function useAdvancedTabAnimation() {
  const pathname = usePathname();
  const [tabHistory, setTabHistory] = useState<TabName[]>(["home"]);
  const [animationState, setAnimationState] = useState<{
    from: TabName | null;
    to: TabName;
    direction: "left" | "right";
    isAnimating: boolean;
  }>({
    from: null,
    to: "home",
    direction: "right",
    isAnimating: false
  });

  useEffect(() => {
    const newTab = pathname.split("/").pop() as TabName;

    if (newTab && tabOrder.includes(newTab)) {
      const currentTab = tabHistory[tabHistory.length - 1];

      if (newTab !== currentTab) {
        const currentIndex = tabOrder.indexOf(currentTab);
        const newIndex = tabOrder.indexOf(newTab);
        const direction = newIndex > currentIndex ? "right" : "left";

        setAnimationState({
          from: currentTab,
          to: newTab,
          direction,
          isAnimating: true
        });

        setTabHistory((prev) => {
          const newHistory = [...prev, newTab];

          return newHistory.slice(-5);
        });

        const timer = setTimeout(() => {
          setAnimationState((prev) => ({ ...prev, isAnimating: false }));
        }, 300);

        return () => clearTimeout(timer);
      }
    }
  }, [pathname, tabHistory]);

  return {
    ...animationState,
    tabHistory,
    getCurrentTabIndex: () => tabOrder.indexOf(animationState.to),
    getPreviousTabIndex: () => (animationState.from ? tabOrder.indexOf(animationState.from) : -1)
  };
}

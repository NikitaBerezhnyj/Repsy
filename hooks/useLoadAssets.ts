import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export function useLoadAssets() {
  const [ready, setReady] = useState(false);

  const load = useCallback(async () => {
    try {
      await Font.loadAsync({
        Unbounded: require("@/assets/fonts/Unbounded.ttf")
      });
    } catch (e) {
      console.warn("❗️ Asset load error:", e);
    } finally {
      setReady(true);
      await SplashScreen.hideAsync();
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return ready;
}

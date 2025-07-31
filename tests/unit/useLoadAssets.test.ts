import { useLoadAssets } from "@/hooks/useLoadAssets";
import { renderHook, waitFor } from "@testing-library/react-native";

// Mock всіх Expo залежностей
jest.mock("expo-font");
jest.mock("expo-splash-screen");
jest.mock("@/assets/fonts/Unbounded.ttf", () => ({}));

const mockFont = require("expo-font");
const mockSplashScreen = require("expo-splash-screen");

describe("useLoadAssets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFont.loadAsync.mockResolvedValue({});
    mockSplashScreen.hideAsync.mockResolvedValue({});
  });

  it("повертає false спочатку, потім true після завантаження", async () => {
    const { result } = renderHook(() => useLoadAssets());

    // Спочатку ready = false
    expect(result.current).toBe(false);

    // Після завантаження ready = true
    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Перевіряємо, що функції були викликані
    expect(mockFont.loadAsync).toHaveBeenCalled();
    expect(mockSplashScreen.hideAsync).toHaveBeenCalled();
  });
});

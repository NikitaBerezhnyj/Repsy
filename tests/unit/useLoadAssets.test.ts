import { useLoadAssets } from "@/hooks/useLoadAssets";
import { renderHook, waitFor } from "@testing-library/react-native";

jest.mock("expo-font");
jest.mock("expo-splash-screen");
jest.mock("@/assets/fonts/Unbounded.ttf", () => ({}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockFont = require("expo-font");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockSplashScreen = require("expo-splash-screen");

describe("[UNIT]: useLoadAssets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFont.loadAsync.mockResolvedValue({});
    mockSplashScreen.hideAsync.mockResolvedValue({});
  });

  it("повертає false спочатку, потім true після завантаження", async () => {
    const { result } = renderHook(() => useLoadAssets());

    expect(result.current).toBe(false);

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    expect(mockFont.loadAsync).toHaveBeenCalled();
    expect(mockSplashScreen.hideAsync).toHaveBeenCalled();
  });
});

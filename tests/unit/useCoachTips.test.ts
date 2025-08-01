import { useCoachTips } from "@/hooks/useCoachTips";
import { renderHook } from "@testing-library/react-native";

const mockLanguage = "en";
const mockTips = {
  hydration: {
    tip1: "Drink water",
    tip2: "Stay hydrated"
  },
  motivation: {
    tip3: "Keep going!"
  }
};

const mockGetDataByLanguage = jest.fn();
const mockI18n = {
  language: mockLanguage,
  getDataByLanguage: mockGetDataByLanguage
};

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: mockI18n
  })
}));

describe("[UNIT]: useCoachTips", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Returns a random tip with emoji", () => {
    mockGetDataByLanguage.mockReturnValue({
      translation: {
        coachTips: mockTips
      }
    });

    const { result } = renderHook(() => useCoachTips());

    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;

    expect(result.current).not.toBeNull();
    expect(result.current?.category).toBeDefined();
    expect(result.current?.key).toBeDefined();
    expect(result.current?.emoji).toMatch(emojiRegex);

    expect(["hydration", "motivation"]).toContain(result.current?.category);
    if (result.current?.category === "hydration") {
      expect(["tip1", "tip2"]).toContain(result.current?.key);
    } else if (result.current?.category === "motivation") {
      expect(result.current?.key).toBe("tip3");
    }
  });

  it("Returns null if no data is returned", () => {
    mockGetDataByLanguage.mockReturnValue(null);

    const { result } = renderHook(() => useCoachTips());

    expect(result.current).toBeNull();
    expect(mockGetDataByLanguage).toHaveBeenCalledWith(mockLanguage);
  });

  it("Returns null if coachTips is missing", () => {
    mockGetDataByLanguage.mockReturnValue({
      translation: {}
    });

    const { result } = renderHook(() => useCoachTips());

    expect(result.current).toBeNull();
  });

  it("Returns null if category is empty", () => {
    mockGetDataByLanguage.mockReturnValue({
      translation: {
        coachTips: {
          hydration: {}
        }
      }
    });

    const { result } = renderHook(() => useCoachTips());

    expect(result.current).toBeNull();
  });
});

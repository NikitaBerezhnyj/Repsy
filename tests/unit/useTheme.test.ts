import { useTheme } from "@/hooks/useTheme";
import { colors, fontSizes, spacing } from "@/theme";

describe("useTheme", () => {
  it("should return the expected theme values", () => {
    const theme = useTheme();

    expect(theme.colors).toBe(colors);
    expect(theme.spacing).toBe(spacing);
    expect(theme.fontSizes).toBe(fontSizes);
  });
});

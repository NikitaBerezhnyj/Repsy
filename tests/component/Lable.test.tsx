import { Label } from "@/components/ui/Label";
import { render } from "@testing-library/react-native";
import React from "react";

describe("[COMPONENT TEST]: Label component", () => {
  it("Renders correctly with children", () => {
    const { getByText } = render(<Label>Test Label</Label>);
    const textElement = getByText("Test Label");
    expect(textElement).toBeTruthy();
  });

  it("Applies custom styles and alignment", () => {
    const { getByText } = render(
      <Label align="center" style={{ fontSize: 30 }}>
        Aligned Label
      </Label>
    );
    const textElement = getByText("Aligned Label");

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textAlign: "center" }),
        expect.objectContaining({ fontSize: 30 })
      ])
    );
  });
});

import { Subtitle } from "@/components/ui/Subtitle";
import { render } from "@testing-library/react-native";
import React from "react";

describe("[COMPONENT TEST]: Subtitle component", () => {
  it("Renders correctly with children", () => {
    const { getByText } = render(<Subtitle>Test Subtitle</Subtitle>);
    const textElement = getByText("Test Subtitle");
    expect(textElement).toBeTruthy();
  });

  it("Applies custom styles and alignment", () => {
    const { getByText } = render(
      <Subtitle align="center" style={{ fontSize: 30 }}>
        Aligned Subtitle
      </Subtitle>
    );
    const textElement = getByText("Aligned Subtitle");

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textAlign: "center" }),
        expect.objectContaining({ fontSize: 30 })
      ])
    );
  });
});

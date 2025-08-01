import { Paragraph } from "@/components/ui/Paragraph";
import { render } from "@testing-library/react-native";
import React from "react";

describe("[COMPONENT TEST]: Paragraph component", () => {
  it("Renders correctly with children", () => {
    const { getByText } = render(<Paragraph>Test Paragraph</Paragraph>);
    const textElement = getByText("Test Paragraph");
    expect(textElement).toBeTruthy();
  });

  it("Applies custom styles and alignment", () => {
    const { getByText } = render(
      <Paragraph align="center" style={{ fontSize: 30 }}>
        Aligned Paragraph
      </Paragraph>
    );
    const textElement = getByText("Aligned Paragraph");

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textAlign: "center" }),
        expect.objectContaining({ fontSize: 30 })
      ])
    );
  });
});

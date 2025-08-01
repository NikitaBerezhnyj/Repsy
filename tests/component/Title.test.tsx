import { Title } from "@/components/ui/Title";
import { render } from "@testing-library/react-native";
import React from "react";

describe("[COMPONENT TEST]: Title component", () => {
  it("Renders correctly with children", () => {
    const { getByText } = render(<Title>Test Title</Title>);
    const textElement = getByText("Test Title");
    expect(textElement).toBeTruthy();
  });

  it("Applies custom styles and alignment", () => {
    const { getByText } = render(
      <Title align="center" style={{ fontSize: 30 }}>
        Aligned Title
      </Title>
    );
    const textElement = getByText("Aligned Title");

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textAlign: "center" }),
        expect.objectContaining({ fontSize: 30 })
      ])
    );
  });
});

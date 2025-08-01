import { MoodButton } from "@/components/ui/MoodButton";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("[COMPONENT TEST]: MoodButton", () => {
  it("Renders emoji and label correctly", () => {
    const { getByText } = render(
      <MoodButton emoji="😀" label="Круто" mood="good" onPress={() => {}} />
    );

    expect(getByText("😀")).toBeTruthy();
    expect(getByText("Круто")).toBeTruthy();
  });

  it("Calls onPress when pressed", () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <MoodButton emoji="😐" label="Нормально" mood="normal" onPress={onPressMock} />
    );

    fireEvent.press(getByText("Нормально"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("Applies correct background color when selected", () => {
    const { getByTestId } = render(
      <MoodButton emoji="😞" label="Погано" mood="bad" selected onPress={() => {}} />
    );

    const button = getByTestId("mood-button");

    expect(button?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: "#EF9A9A"
        })
      ])
    );
  });
});

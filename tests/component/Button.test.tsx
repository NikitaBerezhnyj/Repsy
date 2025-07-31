import { Button } from "@/components/ui/Button";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("Button", () => {
  it("renders correctly with text", () => {
    const { getByText } = render(<Button>Натисни мене</Button>);
    expect(getByText("Натисни мене")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button onPress={onPressMock}>Тест</Button>);

    fireEvent.press(getByText("Тест"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress if disabled", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock} disabled>
        Disabled
      </Button>
    );

    fireEvent.press(getByText("Disabled"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});

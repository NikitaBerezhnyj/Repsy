import { Checkbox } from "@/components/ui/Checkbox";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { act } from "react-test-renderer";

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  return {
    Ionicons: ({ name, ...props }: any) => <Text {...props}>{name}</Text>
  };
});

describe("Checkbox", () => {
  it("рендерить label", () => {
    const { getByText } = render(
      <Checkbox label="Погоджуюсь" checked={false} onToggle={() => {}} />
    );

    expect(getByText("Погоджуюсь")).toBeTruthy();
  });

  it("викликає onToggle при натисканні", () => {
    const onToggleMock = jest.fn();
    const { getByRole } = render(
      <Checkbox label="Погоджуюсь" checked={false} onToggle={onToggleMock} />
    );

    act(() => {
      fireEvent.press(getByRole("checkbox"));
    });

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it("показує правильний стан checked і стилі", () => {
    const { getByText, rerender } = render(
      <Checkbox label="Погоджуюсь" checked={false} onToggle={() => {}} />
    );

    const label = getByText("Погоджуюсь");
    expect(label.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ textDecorationLine: "none" })])
    );

    act(() => {
      rerender(<Checkbox label="Погоджуюсь" checked onToggle={() => {}} />);
    });

    expect(label.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ textDecorationLine: "line-through" })])
    );
  });
});

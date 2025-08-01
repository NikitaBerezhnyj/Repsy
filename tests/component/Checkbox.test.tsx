import { Checkbox } from "@/components/ui/Checkbox";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { act } from "react-test-renderer";

jest.mock("@expo/vector-icons", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");
  return {
    Ionicons: ({ name, ...props }: any) => <Text {...props}>{name}</Text>
  };
});

describe("[COMPONENT TEST]: Checkbox", () => {
  it("renders the label", () => {
    const { getByText } = render(<Checkbox label="I agree" checked={false} onToggle={() => {}} />);

    expect(getByText("I agree")).toBeTruthy();
  });

  it("calls onToggle when pressed", () => {
    const onToggleMock = jest.fn();
    const { getByRole } = render(
      <Checkbox label="I agree" checked={false} onToggle={onToggleMock} />
    );

    act(() => {
      fireEvent.press(getByRole("checkbox"));
    });

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it("shows the correct checked state and styles", () => {
    const { getByText, rerender } = render(
      <Checkbox label="I agree" checked={false} onToggle={() => {}} />
    );

    const label = getByText("I agree");
    expect(label.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ textDecorationLine: "none" })])
    );

    act(() => {
      rerender(<Checkbox label="I agree" checked onToggle={() => {}} />);
    });

    expect(label.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ textDecorationLine: "line-through" })])
    );
  });
});

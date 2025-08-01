import { Input } from "@/components/ui/Input";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("[COMPONENT TEST]: Input", () => {
  it("renders with the provided placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" value="" onChangeText={() => {}} />
    );

    expect(getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("passes the value to the TextInput", () => {
    const { getByDisplayValue } = render(
      <Input placeholder="Email" value="test@example.com" onChangeText={() => {}} />
    );

    expect(getByDisplayValue("test@example.com")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Password" value="" onChangeText={onChangeMock} secureTextEntry />
    );

    fireEvent.changeText(getByPlaceholderText("Password"), "12345");
    expect(onChangeMock).toHaveBeenCalledWith("12345");
  });

  it("correctly passes secureTextEntry and keyboardType props", () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Password"
        value=""
        onChangeText={() => {}}
        secureTextEntry
        keyboardType="default"
      />
    );

    const input = getByPlaceholderText("Password");
    expect(input.props.secureTextEntry).toBe(true);
    expect(input.props.keyboardType).toBe("default");
  });
});

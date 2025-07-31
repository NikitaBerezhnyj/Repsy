import { Input } from "@/components/ui/Input";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("Input", () => {
  it("рендериться з переданим placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Введіть текст" value="" onChangeText={() => {}} />
    );

    expect(getByPlaceholderText("Введіть текст")).toBeTruthy();
  });

  it("передає значення у TextInput", () => {
    const { getByDisplayValue } = render(
      <Input placeholder="Email" value="test@example.com" onChangeText={() => {}} />
    );

    expect(getByDisplayValue("test@example.com")).toBeTruthy();
  });

  it("викликає onChangeText при зміні тексту", () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Пароль" value="" onChangeText={onChangeMock} secureTextEntry />
    );

    fireEvent.changeText(getByPlaceholderText("Пароль"), "12345");
    expect(onChangeMock).toHaveBeenCalledWith("12345");
  });

  it("передає secureTextEntry і keyboardType правильно", () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Пароль"
        value=""
        onChangeText={() => {}}
        secureTextEntry
        keyboardType="default"
      />
    );

    const input = getByPlaceholderText("Пароль");
    expect(input.props.secureTextEntry).toBe(true);
    expect(input.props.keyboardType).toBe("default");
  });
});

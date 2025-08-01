import { colors, sizes, spacing } from "@/theme";
import React from "react";
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

type InputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[styles.container(colors, spacing), containerStyle]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.primary}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={[styles.input(colors, sizes), inputStyle]}
        {...props}
      />
    </View>
  );
};

const styles = {
  container: (colors: any, spacing: any): ViewStyle => ({
    backgroundColor: colors.card,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginVertical: spacing.xs
  }),
  input: (colors: any, sizes: any): TextStyle => ({
    color: colors.text,
    fontSize: sizes.md,
    padding: spacing.none
  })
};

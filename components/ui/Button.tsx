import { colors, sizes, spacing } from "@/theme";
import React, { useEffect } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from "react-native";
import { useDebouncedCallback } from "use-debounce";

type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  debounceTime?: number;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  style,
  textStyle,
  debounceTime = 500,
  disabled,
  ...props
}) => {
  const debouncedOnPress = useDebouncedCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        onPress(event);
      }
    },
    debounceTime,
    { leading: true, trailing: false }
  );

  useEffect(() => {
    return () => {
      debouncedOnPress.cancel();
    };
  }, [debouncedOnPress]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={disabled ? undefined : debouncedOnPress}
      disabled={disabled}
      style={[
        {
          width: "100%",
          backgroundColor: disabled ? colors.border : colors.primary,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.6 : 1,
          marginBottom: spacing.sm
        },
        style
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          style={[
            {
              color: colors.background,
              fontSize: sizes.md,
              fontWeight: "600"
            },
            textStyle
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

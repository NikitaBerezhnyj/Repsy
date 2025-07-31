import { useTheme } from "@/hooks/useTheme";
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
  const { colors, spacing, fontSizes } = useTheme();

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
          backgroundColor: disabled ? colors.border : colors.primary,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.6 : 1
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
              fontSize: fontSizes.md,
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

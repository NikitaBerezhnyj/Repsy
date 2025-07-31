import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type LabelProps = TextProps & {
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({ align = "left", style, children, ...props }) => {
  const { colors, fontSizes } = useTheme();

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Unbounded",
          fontSize: fontSizes.sm,
          color: colors.textMuted,
          fontWeight: "400",
          textAlign: align
        },
        style
      ]}
    >
      {children}
    </Text>
  );
};

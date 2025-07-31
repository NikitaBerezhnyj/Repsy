import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type SubtitleProps = TextProps & {
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export const Subtitle: React.FC<SubtitleProps> = ({
  align = "left",
  style,
  children,
  ...props
}) => {
  const { colors, fontSizes } = useTheme();

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Unbounded",
          fontSize: fontSizes.lg,
          color: colors.text,
          fontWeight: "600",
          textAlign: align
        },
        style
      ]}
    >
      {children}
    </Text>
  );
};

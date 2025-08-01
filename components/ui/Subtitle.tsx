import { colors, sizes, spacing } from "@/theme";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle, View } from "react-native";

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
  return (
    <View>
      <Text
        {...props}
        style={[
          {
            fontFamily: "Unbounded",
            fontSize: sizes.lg,
            color: colors.text,
            fontWeight: "600",
            textAlign: align,
            marginBottom: spacing.sm
          },
          style
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

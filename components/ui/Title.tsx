import { colors, sizes, spacing } from "@/theme";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle, View } from "react-native";

type TitleProps = TextProps & {
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ align = "left", style, children, ...props }) => {
  return (
    <View>
      <Text
        {...props}
        style={[
          {
            fontFamily: "Unbounded",
            fontSize: sizes.xl,
            color: colors.text,
            fontWeight: "800",
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

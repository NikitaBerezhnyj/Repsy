import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle, View } from "react-native";

type TitleProps = TextProps & {
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ align = "left", style, children, ...props }) => {
  const { colors, spacing, fontSizes } = useTheme();

  return (
    <View>
      <Text
        {...props}
        style={[
          {
            fontFamily: "Unbounded",
            fontSize: fontSizes.xl,
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

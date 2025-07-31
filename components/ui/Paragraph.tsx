import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle, View } from "react-native";

type ParagraphProps = TextProps & {
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export const Paragraph: React.FC<ParagraphProps> = ({
  align = "left",
  style,
  children,
  ...props
}) => {
  const { colors, spacing, fontSizes } = useTheme();

  return (
    <View>
      <Text
        {...props}
        style={[
          {
            fontFamily: "Unbounded",
            fontSize: fontSizes.md,
            color: colors.text,
            fontWeight: "400",
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

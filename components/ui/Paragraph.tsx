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
  const { colors, fontSizes } = useTheme();

  return (
    <View style={{ width: "100%" }}>
      <Text
        {...props}
        style={[
          {
            fontSize: fontSizes.md,
            color: colors.text,
            fontWeight: "400",
            textAlign: align
          },
          style
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

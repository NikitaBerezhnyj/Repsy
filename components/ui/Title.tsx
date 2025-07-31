import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle, View } from "react-native";

type TitleProps = TextProps & {
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ align = "left", style, children, ...props }) => {
  const { colors, fontSizes } = useTheme();

  return (
    <View style={{ width: "100%" }}>
      <Text
        {...props}
        style={[
          {
            fontSize: fontSizes.xl,
            color: colors.text,
            fontWeight: "bold",
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

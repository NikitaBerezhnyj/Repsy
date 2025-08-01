import { colors, sizes, spacing } from "@/theme";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle, View } from "react-native";

type LabelProps = TextProps & {
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({ align = "left", style, children, ...props }) => {
  return (
    <View>
      <Text
        {...props}
        style={[
          {
            fontFamily: "Unbounded",
            fontSize: sizes.sm,
            color: colors.textMuted,
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

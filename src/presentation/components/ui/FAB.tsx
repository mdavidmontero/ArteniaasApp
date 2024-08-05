import { Button } from "@ui-kitten/components";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
export const FAB = ({ style, onPress }: Props) => {
  return (
    <Button
      style={[
        style,
        {
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 15,
          borderRadius: 13,
        },
      ]}
      accessoryLeft={<FontAwesome size={28} name="plus-circle" white />}
      onPress={onPress}
    />
  );
};

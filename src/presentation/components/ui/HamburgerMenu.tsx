import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { MyIcon } from "./MyIcon";

export const HamburgerMenu = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ margin: 20 }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        >
          <MyIcon name="menu-outline" />
        </Pressable>
      ),
    });
  }, []);
  return <></>;
};

import React, { ReactNode } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HamburgerMenu } from "./HamburgerMenu";

interface Props {
  children: ReactNode;
}

export const CustomView = ({ children }: Props) => {
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.marginContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  marginContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
});

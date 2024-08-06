import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Prueba = () => {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <View style={[{ paddingTop: top }, styles.container]}>
        <Text>Prueba</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
});

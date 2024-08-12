import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Spinner = () => {
  return (
    <View style={styles.container}>
      <Spinner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

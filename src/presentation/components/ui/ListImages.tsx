import React from "react";
import { StyleSheet, useWindowDimensions, View, Image } from "react-native";
import { Text } from "@ui-kitten/components";
interface Props {
  images: string;
}
export const ListImages = ({ images }: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.image, { width: width * 0.9, height: height * 0.3 }]}>
      {images.length === 0 ? (
        <Image
          source={require("../../../../assets/no-product-image.png")}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      ) : (
        <Image
          source={{ uri: images }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});

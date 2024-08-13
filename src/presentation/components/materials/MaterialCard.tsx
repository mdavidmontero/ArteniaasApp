import React from "react";
import { View, Image, StyleSheet, useWindowDimensions } from "react-native";
import { Text, Card } from "@ui-kitten/components";
import { Materials } from "../../../domain/entities/materials";
import { FadeInImage } from "../ui/FadeInImage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/SideMenuNavigator";

interface Props {
  material: Materials;
}
export const MaterialCard = ({ material }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <Card
      style={{ flex: 1, backgroundColor: "#F9F9F9", margin: 3 }}
      onPress={() =>
        navigation.navigate("MaterialForm", { materialId: material.id })
      }
    >
      {material.image.length === 0 ? (
        <Image
          source={require("../../../../assets/no-product-image.png")}
          style={{
            width: "100%",
            height: 200,
          }}
        />
      ) : (
        <FadeInImage
          uri={material.image}
          style={{ flex: 1, height: 200, width: "100%" }}
        />
      )}
      <Text numberOfLines={2} style={{ textAlign: "center" }}>
        {material.name}
      </Text>
    </Card>
  );
};

export default MaterialCard;

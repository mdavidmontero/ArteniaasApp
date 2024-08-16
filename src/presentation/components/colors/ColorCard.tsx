import React from "react";
import { Button, Card, Text } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Category } from "../../../domain/entities/category";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { Alert, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { Colors } from "../../../domain/entities/colors";
import { deleteColor } from "../../../actions/colors.actions";

interface Props {
  color: Colors;
}

export const ColorsCard = ({ color }: Props) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handlePress = () => {
    navigation.navigate("ColorForm", { colorId: color.id });
  };
  const handleDelete = async (id: Category["id"]) => {
    Alert.alert("Eliminar color", "¿Estás seguro de eliminar el color?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: async () => {
          await deleteColor(id);
          queryClient.invalidateQueries({ queryKey: ["colores"] });
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <Card
      style={{ flex: 1, backgroundColor: "#F9F9F9", margin: 3, height: "100%" }}
      onPress={handlePress}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text numberOfLines={2} style={{ textAlign: "center" }}>
          {color.name}
        </Text>
        <Button
          onLongPress={() => handleDelete(color.id)}
          style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}
        >
          Eliminar
        </Button>
      </View>
    </Card>
  );
};

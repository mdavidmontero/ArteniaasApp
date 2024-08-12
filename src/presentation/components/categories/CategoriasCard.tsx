interface Props {
  categoria: Category;
}

import React from "react";
import { Button, Card, Text } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Category } from "../../../domain/entities/category";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { Alert, View } from "react-native";
import { deletecategory } from "../../../actions/categories.actions";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  categoria: Category;
}

export const CategoriasCard = ({ categoria }: Props) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handlePress = () => {
    navigation.navigate("CategoriaScreen", { categoryId: categoria.id });
  };
  const handleDelete = async (id: Category["id"]) => {
    // Validar antes de eliminar
    Alert.alert(
      "Eliminar categoría",
      "¿Estás seguro de eliminar esta categoría?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            await deletecategory(id);
            queryClient.invalidateQueries({ queryKey: ["categorias"] });
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <Card
      style={{ flex: 1, backgroundColor: "#F9F9F9", margin: 3 }}
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
          {categoria.name}
        </Text>
        <Button
          onLongPress={() => handleDelete(categoria.id)}
          style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}
        >
          Eliminar
        </Button>
      </View>
    </Card>
  );
};

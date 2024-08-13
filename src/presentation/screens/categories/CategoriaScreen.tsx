import React, { useState, useEffect } from "react";
import { CustomView } from "../../components/ui/CustomView";
import { Button, Input, Text } from "@ui-kitten/components";
import { Category } from "../../../domain/entities/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  getcategoryById,
  updateCategory,
} from "../../../actions/categories.actions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { Alert, View, ActivityIndicator } from "react-native";
import { HamburgerMenu } from "../../components/ui/HamburgerMenu";

interface Props extends StackScreenProps<RootStackParams, "CategoriaScreen"> {}

export const CategoriaScreen = ({ route, navigation }: Props) => {
  const queryClient = useQueryClient();
  const categoryId = route.params.categoryId;

  const [categoria, setCategoria] = useState<Category>({
    id: "",
    name: "",
  });

  const { data, isLoading, error } = useQuery<Category | null>({
    queryKey: ["categoria", categoryId],
    queryFn: () => getcategoryById(categoryId),
    enabled: !!categoryId,
  });

  useEffect(() => {
    if (data) {
      setCategoria(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (data: Category) => {
      return data.id ? updateCategory(data.id, data) : createCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error saving category:", error);
    },
  });

  const handleSave = () => {
    if (!categoria.name.trim()) {
      Alert.alert(
        "Nombre Vacío",
        "Por favor ingrese un nombre para la categoría."
      );
      return;
    }
    mutation.mutate(categoria);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Error al cargar la categoría: {error.message}</Text>;
  }

  return (
    <CustomView>
      <Text category="h3" style={{ textAlign: "center" }}>
        {categoryId ? "Editar Categoria" : "Nueva Categoria"}
      </Text>
      <Input
        placeholder="Categoria"
        style={{ marginVertical: 10 }}
        label="Nombre Categoria"
        value={categoria.name}
        onChangeText={(text) => setCategoria({ ...categoria, name: text })}
      />
      <Button onPress={handleSave} disabled={mutation.isPending}>
        {mutation.isPending ? "Guardando..." : "Guardar"}
      </Button>
    </CustomView>
  );
};

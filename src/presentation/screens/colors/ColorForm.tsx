import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import { Pressable, View, Alert } from "react-native";
import { CustomView } from "../../components/ui/CustomView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors } from "../../../domain/entities/colors";
import {
  createColors,
  getcolorById,
  updateColor,
} from "../../../actions/colors.actions";

interface Props extends StackScreenProps<RootStackParams, "ColorForm"> {}
export const ColorForm = ({ navigation, route }: Props) => {
  const colorId = route.params.colorId;
  const queryClient = useQueryClient();
  const [color, setColor] = useState<Colors>({
    id: "",
    name: "",
  });
  const { data, isLoading, error } = useQuery<Colors | null>({
    queryKey: ["colores", colorId],
    queryFn: () => getcolorById(colorId),
    enabled: !!colorId,
  });
  useEffect(() => {
    if (data) {
      setColor(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (data: Colors) => {
      return data.id ? updateColor(data.id, data) : createColors(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colores"] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error saving colores:", error);
    },
  });
  const handleSave = () => {
    if (!color.name.trim()) {
      Alert.alert("Nombre Vacío", "Por favor ingrese un nombre para el color.");
      return;
    }
    mutation.mutate(color);
  };

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return <Text>Error al cargar el color: {error.message}</Text>;
  }

  return (
    <CustomView>
      <View style={{ flex: 1 }}>
        <Layout style={{ marginHorizontal: 10 }}>
          <Input
            label="Nombre Color"
            style={{ marginVertical: 5 }}
            value={color.name}
            onChangeText={(text) => setColor({ ...color, name: text })}
          />
        </Layout>
        <Button onPress={handleSave} disabled={mutation.isPending}>
          {mutation.isPending ? "Guardando..." : "Guardar"}
        </Button>
      </View>
    </CustomView>
  );
};

export default ColorForm;

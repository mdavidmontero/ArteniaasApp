import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import { Pressable, View, Alert } from "react-native";
import { CameraOne } from "../../../config/adapters/cameraPhotos";
import { ListImages } from "../../components/ui/ListImages";
import { CustomView } from "../../components/ui/CustomView";
import { ModalPhto } from "../../components/ui/ModalPhoto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { Decoration } from "../../../domain/entities/decoration";
import {
  createDecorations,
  getDecorationById,
  updateDecoration,
} from "../../../actions/decoration.actions";

interface Props extends StackScreenProps<RootStackParams, "DecorationForm"> {}
export const DecorationForm = ({ navigation, route }: Props) => {
  const decorationId = route.params.decorationId;
  console.log(decorationId);
  const queryClient = useQueryClient();
  const [decoration, setDecoration] = useState<Decoration>({
    id: "",
    descripcion: "",
    precio: 0,
    imagen: "",
  });
  const [modal, setModal] = useState(false);
  const { data, isLoading, error } = useQuery<Decoration | null>({
    queryKey: ["decoraciones", decorationId],
    queryFn: () => getDecorationById(decorationId),
    enabled: !!decorationId,
  });
  console.log(data);
  useEffect(() => {
    if (data) {
      setDecoration(data);
    }
  }, [data]);

  const handleTakePicture = async () => {
    const result = await CameraOne.takePicture();
    if (result && result.length > 0) {
      setDecoration({ ...decoration, imagen: result[0].uri });
      setModal(false);
    }
  };

  const handleSelectFromGallery = async () => {
    const result = await CameraOne.getPicturesFromLibraryOne();
    if (result && result.length > 0) {
      setDecoration({ ...decoration, imagen: result[0] });
      setModal(false);
    }
  };

  const handlePhoto = () => {
    setModal(true);
  };

  const mutation = useMutation({
    mutationFn: (data: Decoration) => {
      return data.id
        ? updateDecoration(data.id, data)
        : createDecorations(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decoraciones"] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error saving decoración:", error);
    },
  });
  const handleSave = () => {
    if (!decoration.descripcion.trim()) {
      Alert.alert("Nombre Vacío", "Por favor ingrese una descripción");
      return;
    }
    mutation.mutate(decoration);
  };

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return <Text>Error al cargar la decoración: {error.message}</Text>;
  }

  return (
    <CustomView>
      <View style={{ flex: 1 }}>
        {modal && (
          <ModalPhto
            modal={modal}
            setModal={setModal}
            handleTakePicture={handleTakePicture}
            handleSelectFromGallery={handleSelectFromGallery}
          />
        )}

        <Pressable onPress={handlePhoto}>
          <Layout
            style={{
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListImages images={decoration.imagen} />
          </Layout>
        </Pressable>

        <Layout style={{ marginHorizontal: 10 }}>
          <Input
            label="Descripción"
            style={{ marginVertical: 5 }}
            value={decoration.descripcion}
            onChangeText={(text) =>
              setDecoration({ ...decoration, descripcion: text })
            }
          />
          <Input
            label="Precio"
            style={{ marginVertical: 5 }}
            value={decoration.precio.toString()}
            onChangeText={(text) =>
              setDecoration({ ...decoration, precio: parseInt(text) })
            }
          />
        </Layout>
        <Button onPress={handleSave} disabled={mutation.isPending}>
          {mutation.isPending ? "Guardando..." : "Guardar"}
        </Button>
      </View>
    </CustomView>
  );
};

export default DecorationForm;

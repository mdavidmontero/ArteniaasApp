import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import { Pressable, View, Alert } from "react-native";
import { CameraOne } from "../../../config/adapters/cameraPhotos";
import { ListImages } from "../../components/ui/ListImages";
import { Materials } from "../../../domain/entities/materials";
import { CustomView } from "../../components/ui/CustomView";
import { ModalPhto } from "../../components/ui/ModalPhoto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMaterial,
  getMaterialById,
  updateMaterial,
} from "../../../actions/materials.actions";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<RootStackParams, "MaterialForm"> {}
export const MaterialForm = ({ navigation, route }: Props) => {
  const materialId = route.params.materialId;
  const queryClient = useQueryClient();
  const [material, setMaterial] = useState<Materials>({
    id: "",
    name: "",
    description: "",
    image: "",
  });
  const [modal, setModal] = useState(false);
  const { data, isLoading, error } = useQuery<Materials | null>({
    queryKey: ["materiales", materialId],
    queryFn: () => getMaterialById(materialId),
    enabled: !!materialId,
  });
  useEffect(() => {
    if (data) {
      setMaterial(data);
    }
  }, [data]);

  const handleTakePicture = async () => {
    const result = await CameraOne.takePicture();
    if (result && result.length > 0) {
      setMaterial({ ...material, image: result[0].uri });
      setModal(false);
    }
  };

  const handleSelectFromGallery = async () => {
    const result = await CameraOne.getPicturesFromLibraryOne();
    if (result && result.length > 0) {
      setMaterial({ ...material, image: result[0] });
      setModal(false);
    }
  };

  const handlePhoto = () => {
    setModal(true);
  };

  const mutation = useMutation({
    mutationFn: (data: Materials) => {
      return data.id ? updateMaterial(data.id, data) : createMaterial(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materiales"] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error saving material:", error);
    },
  });
  const handleSave = () => {
    if (!material.name.trim()) {
      Alert.alert(
        "Nombre Vacío",
        "Por favor ingrese un nombre para la categoría."
      );
      return;
    }
    mutation.mutate(material);
  };

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return <Text>Error al cargar la categoría: {error.message}</Text>;
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
            <ListImages images={material.image} />
          </Layout>
        </Pressable>

        <Layout style={{ marginHorizontal: 10 }}>
          <Input
            label="Nombre Material"
            style={{ marginVertical: 5 }}
            value={material.name}
            onChangeText={(text) => setMaterial({ ...material, name: text })}
          />
          <Input
            label="Descripción"
            style={{ marginVertical: 5 }}
            value={material.description}
            onChangeText={(text) =>
              setMaterial({ ...material, description: text })
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

export default MaterialForm;

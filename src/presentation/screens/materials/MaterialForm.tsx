import React, { useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { CameraOne } from "../../../config/adapters/cameraPhotos";
import { ListImages } from "../../components/ui/ListImages";
import { Materials } from "../../../domain/entities/materials";
import { CustomView } from "../../components/ui/CustomView";
import { ModalPhto } from "../../components/ui/ModalPhoto";

export const MaterialForm = () => {
  const [material, setMaterial] = useState<Materials>({
    id: "",
    name: "",
    description: "",
    image: "",
  });
  const [modal, setModal] = useState(false);

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
            onChangeText={(text) => setMaterial({ ...material, name: text })}
          />
          <Input
            label="Descripción"
            style={{ marginVertical: 5 }}
            onChangeText={(text) =>
              setMaterial({ ...material, description: text })
            }
          />
        </Layout>
        <Button style={{ marginVertical: 5 }}>Guardar</Button>
      </View>
    </CustomView>
  );
};

export default MaterialForm;

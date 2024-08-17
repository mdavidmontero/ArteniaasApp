import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { CustomView } from "../../components/ui/CustomView";
import { Pressable } from "react-native";
import { ListImages } from "../../components/ui/ListImages";
import { CameraOne } from "../../../config/adapters/cameraPhotos";
import { ModalPhto } from "../../components/ui/ModalPhoto";
import { RolUsuario, User } from "../../../domain/entities/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store/useAuthStore";
import {
  actualizarUsuario,
  obtenerUsuarioPorId,
} from "../../../actions/user.action";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export const UpdatePerfilScreen = () => {
  const { user, setUser } = useAuthStore();
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const [perfil, setPerfil] = useState<User>({
    id: "",
    correo: "",
    nombre: "",
    password: "",
    fotoPerfil: "",
    telefono: "",
    direccion: "",
    roles: user?.roles!,
  });

  const { data, isLoading, error } = useQuery<User | null>({
    queryKey: ["usuarios", user!.id],
    queryFn: () => obtenerUsuarioPorId(user!.id),
  });

  useEffect(() => {
    if (data) {
      setPerfil(data);
    }
  }, [data]);

  const handleTakePicture = async () => {
    const result = await CameraOne.takePicture();
    if (result && result.length > 0) {
      setPerfil({ ...perfil, fotoPerfil: result[0].uri });
      setModal(false);
    }
  };

  const handleSelectFromGallery = async () => {
    const result = await CameraOne.getPicturesFromLibraryOne();
    if (result && result.length > 0) {
      setPerfil({ ...perfil, fotoPerfil: result[0] });
      setModal(false);
    }
  };

  const handlePhoto = () => {
    setModal(true);
  };
  const mutation = useMutation({
    mutationFn: (data: User) => actualizarUsuario(data!.id, data!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
    onError: (error) => {
      console.error("Error saving decoración:", error);
    },
  });

  const handleChange = () => {
    mutation.mutate(perfil);
    setUser(perfil);
  };

  return (
    <CustomView>
      {modal && (
        <ModalPhto
          modal={modal}
          setModal={setModal}
          handleTakePicture={handleTakePicture}
          handleSelectFromGallery={handleSelectFromGallery}
        />
      )}
      <ScrollView>
        <Layout>
          <Pressable onPress={handlePhoto}>
            <ListImages
              images={perfil.fotoPerfil!}
              style={{ width: 200, borderRadius: 28, height: 200 }}
            />
          </Pressable>
        </Layout>
        <Layout style={{ marginHorizontal: 5 }}>
          <Input
            label="Nombre"
            placeholder="Escriba su nombre"
            value={perfil.nombre}
            style={{ marginVertical: 5 }}
            onChangeText={(text) => setPerfil({ ...perfil, nombre: text })}
          />
          <Input
            label="Correo"
            placeholder="Escriba su email"
            style={{ marginVertical: 5 }}
            value={perfil.correo}
            keyboardType="email-address"
            onChangeText={(text) => setPerfil({ ...perfil, correo: text })}
            disabled
          />
          <Input
            label="Telefono"
            placeholder="Escriba su telefono"
            value={perfil.telefono}
            style={{ marginVertical: 5 }}
            keyboardType="number-pad"
            onChangeText={(text) => setPerfil({ ...perfil, telefono: text })}
          />
          <Input
            label="Dirección"
            placeholder="Escriba su Dirección"
            value={perfil.direccion}
            style={{ marginVertical: 5 }}
            keyboardType="default"
            onChangeText={(text) => setPerfil({ ...perfil, direccion: text })}
          />
          <Input
            label="Tipo Usuario"
            style={{ marginVertical: 5 }}
            value={perfil.roles}
            disabled
            onChangeText={(text) =>
              setPerfil({ ...perfil, roles: text as RolUsuario })
            }
          />

          <Button
            onPress={handleChange}
            disabled={mutation.isPending}
            style={{ marginVertical: 10 }}
          >
            {mutation.isPending ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Layout>
      </ScrollView>
    </CustomView>
  );
};

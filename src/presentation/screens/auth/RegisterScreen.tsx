import { Input, Layout, Text, Button } from "@ui-kitten/components";
import { Alert, ScrollView, useWindowDimensions } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { MyIcon } from "../../components/ui/MyIcon";
import { RootStackParams } from "../../navigator/AuthNavigator";
import { registerUser } from "../../../actions/auth.actions";
import { RolUsuario, User } from "../../../domain/entities/user";
import { registraUsuario } from "../../../types";

interface Props extends StackScreenProps<RootStackParams, "RegisterScreen"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    telefono: "",
    roles: RolUsuario.CLIENTE,
    fotoPerfil: "",
  });

  const onRegister = async () => {
    if (
      form.correo.length === 0 ||
      form.password.length === 0 ||
      form.password.length === 0
    ) {
      return;
    }
    setIsPosting(true);
    const wasSuccessful = await registerUser(
      form.nombre,
      form.correo,
      form.password,
      form.telefono,
      form.roles
    );

    console.log(wasSuccessful);
    if (wasSuccessful) {
      navigation.navigate("LoginScreen");
      return;
    }
    setIsPosting(false);
    Alert.alert("Error en el registro, intente nuevamente..");
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.3 }}>
          <Text category="h1">Crear Cuenta</Text>
          <Text category="p2">Por favor crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Nombre Completo"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
            value={form.nombre}
            onChangeText={(nombre) => setForm({ ...form, nombre })}
            keyboardType="default"
          />
          <Input
            placeholder="Telefono"
            accessoryLeft={<MyIcon name="phone-outline" />}
            style={{ marginBottom: 10 }}
            value={form.telefono}
            onChangeText={(telefono) => setForm({ ...form, telefono })}
            keyboardType="number-pad"
          />
          <Input
            placeholder="Correo Electronico"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
            keyboardType="email-address"
            value={form.correo}
            onChangeText={(correo) => setForm({ ...form, correo })}
            autoCapitalize="none"
          />
          <Input
            placeholder="Contraseña"
            accessoryLeft={<MyIcon name="lock-outline" />}
            autoCapitalize="none"
            secureTextEntry={true}
            style={{ marginBottom: 10 }}
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
          />
          {/* Space */}
          <Layout style={{ height: 10 }} />

          <Layout>
            <Button
              onPress={onRegister}
              disabled={isPosting}
              appearance="filled"
              accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            >
              Crear
            </Button>
          </Layout>
          <Layout style={{ height: 50 }} />
          <Layout
            style={{
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text>Ya tienes una Cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.pop()}
            >
              {" "}
              Ingresar
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

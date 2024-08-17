import { Input, Layout, Text, Button } from "@ui-kitten/components";
import { Alert, ScrollView, useWindowDimensions } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { login } from "../../../actions/auth.actions";
import { obtenerUsuarioPorId } from "../../../actions/user.action";
import { useAuthStore } from "../../store/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, "LoginScreen"> {}

export const LoginScreen = ({ navigation }: Props) => {
  const [isPosting, setisPosting] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({ correo: "", password: "" });
  const { height } = useWindowDimensions();

  const onLogin = async () => {
    if (form.correo.length === 0 || form.password.length === 0) {
      return;
    }
    const wasSuccessful = await login(form.correo, form.password);
    setisPosting(true);
    try {
      if (wasSuccessful) {
        const user = await obtenerUsuarioPorId(wasSuccessful);
        if (user) {
          setUser(user);
        } else {
          Alert.alert("Error", "No se encontró el usuario.");
        }
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Credenciales incorrectas. Por favor, verifica tus datos e intenta de nuevo."
      );
    }
    setisPosting(false);
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor Ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Correo Electronico"
            style={{ marginBottom: 10 }}
            autoCapitalize="none"
            value={form.correo}
            onChangeText={(correo) => setForm({ ...form, correo })}
            keyboardType="email-address"
            // accessoryLeft={<MyIcon name="email-outline" />}
          />
          <Input
            placeholder="Contraseña"
            // accessoryLeft={<MyIcon name="lock-outline" />}
            autoCapitalize="none"
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            secureTextEntry={true}
            style={{ marginBottom: 10 }}
          />

          {/* Space */}
          <Layout style={{ height: 10 }} />

          <Layout>
            <Button
              disabled={isPosting}
              onPress={onLogin}
              appearance="filled"
              // accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            >
              Ingresar
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
            <Text>No tienes cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              {" "}
              crea una
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

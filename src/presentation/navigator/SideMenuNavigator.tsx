import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import { globalColors } from "../../config/theme/theme";
import { MyIcon } from "../components/ui/MyIcon";
import { HomeScreen } from "../screens/home/HomeScreen";
import { ProductScreen } from "../screens/products/ProductsScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { CategoriasScreen } from "../screens/categories/CategoriasScreen";
import { CategoriaScreen } from "../screens/categories/CategoriaScreen";
import { MaterialScreen } from "../screens/materials/MaterialScreen";
import { MaterialForm } from "../screens/materials/MaterialForm";
import { ColorForm } from "../screens/colors/ColorForm";
import { ColorsScreen } from "../screens/colors/ColorScreen";
import { DecorationScreen } from "../screens/decorations/DecorationScreen";
import DecorationForm from "../screens/decorations/DecorationForm";
import { Button, Text } from "@ui-kitten/components";
import { useAuthStore } from "../store/useAuthStore";
import { UpdatePerfilScreen } from "../screens/user/UpdatePerfil";
import { logout } from "../../actions/auth.actions";

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  UpdatePerfil: undefined;
  HomeScreen: undefined;
  Home: undefined;
  ProductScreen: { productId: string };
  CategoriasScreen: undefined;
  CategoriaScreen: { categoryId: string };
  MaterialsScreen: undefined;
  MaterialForm: { materialId: string };
  ColorForm: { colorId: string };
  DecorationForm: { decorationId: string };
  Logout: undefined;
};

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParams>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="Home"
        component={SideMenuNavigator}
      />

      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="ProductScreen"
        component={ProductScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="UpdatePerfil"
        component={UpdatePerfilScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="CategoriasScreen"
        component={CategoriasScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="CategoriaScreen"
        component={CategoriaScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="MaterialsScreen"
        component={MaterialScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="MaterialForm"
        component={MaterialForm}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="ColorForm"
        component={ColorForm}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="DecorationForm"
        component={DecorationForm}
      />
    </Stack.Navigator>
  );
};

const SideMenuNavigator = () => {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: dimensions.width >= 758 ? "permanent" : "slide",
        headerShown: true,
        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: globalColors.primary,
        drawerItemStyle: { borderRadius: 10, paddingHorizontal: 20 },
      }}
    >
      <Drawer.Screen
        name="Productos"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MyIcon name="menu-2-outline" color={color} />
          ),
          drawerLabel: "Productos",
        }}
      />
      <Drawer.Screen
        name="Categorias"
        component={CategoriasScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MyIcon name="menu-2-outline" color={color} />
          ),
          drawerLabel: "Categorias",
        }}
      />
      <Drawer.Screen
        name="Materiales"
        component={MaterialScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MyIcon name="menu-2-outline" color={color} />
          ),
          drawerLabel: "Materiales",
        }}
      />
      <Drawer.Screen
        name="Colores"
        component={ColorsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MyIcon name="menu-2-outline" color={color} />
          ),
          drawerLabel: "Colores",
        }}
      />
      <Drawer.Screen
        name="Decoraciones"
        component={DecorationScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MyIcon name="menu-2-outline" color={color} />
          ),
          drawerLabel: "Decoraciones",
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={UpdatePerfilScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MyIcon name="menu-2-outline" color={color} />
          ),
          drawerLabel: "Perfil",
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const handleLogout = async () => {
    await logout();
    setUser(null);
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={
            user?.fotoPerfil === ""
              ? require("../../../assets/no-product-image.png")
              : { uri: user?.fotoPerfil }
          }
          style={styles.profileImage}
        />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.infoProfile}>{user?.nombre}</Text>
        <Text style={styles.infoProfile}>{user?.correo}</Text>
      </View>

      <DrawerItemList {...props} />
      <Button onPress={handleLogout}>Salir</Button>
    </DrawerContentScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  profileContainer: {
    height: 200,
    marginVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  containerText: {
    marginBottom: 10,
  },
  infoProfile: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeStackNavigator;

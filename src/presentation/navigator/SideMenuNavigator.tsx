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
import { Prueba } from "../screens/products/Prueba";
import { HomeScreen } from "../screens/home/HomeScreen";
import { ProductScreen } from "../screens/products/ProductsScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
// import { HamburgerMenu } from "../components/ui/HamburgerMenu";

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  Prueba: undefined;
  ProductScreen: { productId: string };
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

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
        }}
        name="HomeScreen"
        component={SideMenuNavigator}
      />
      <Stack.Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
        }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
        }}
        name="ProductScreen"
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};

export const SideMenuNavigator = () => {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: dimensions.width >= 758 ? "permanent" : "slide",
        headerShown: true,
        headerStyle: {
          height: 10,
        },
        headerTitle: "",
        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: globalColors.primary,
        drawerItemStyle: {
          borderRadius: 100,
          paddingHorizontal: 20,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => <MyIcon name="menu-2-outline" />,
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="Prueba"
        component={Prueba}
        options={{
          drawerIcon: ({ color }) => <MyIcon name="menu-2-outline" />,
          drawerLabel: "Perfil",
        }}
      />
      <Drawer.Screen
        name="Categorias"
        component={Prueba}
        options={{
          drawerIcon: ({ color }) => <MyIcon name="menu-2-outline" />,
          drawerLabel: "Categorias",
        }}
      />
      <Drawer.Screen
        name="Materiales"
        component={Prueba}
        options={{
          drawerIcon: ({ color }) => <MyIcon name="menu-2-outline" />,
          drawerLabel: "Materiales",
        }}
      />
      <Drawer.Screen
        name="Color"
        component={Prueba}
        options={{
          drawerIcon: ({ color }) => <MyIcon name="menu-2-outline" />,
          drawerLabel: "Colores",
        }}
      />
      <Drawer.Screen
        name="Cerrar Sesión"
        component={Prueba}
        options={{
          drawerIcon: ({ color }) => <MyIcon name="menu-2-outline" />,
          drawerLabel: "Salir",
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/artesaniasapp-8965e.appspot.com/o/products%2F1723096428042_1j0y068d7?alt=media&token=e7884cec-31e5-4cdc-a5b5-750f6eb7c563",
          }}
          style={styles.profileImage}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    height: 200,
    backgroundColor: globalColors.primary,
    margin: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  profileName: {
    color: "white",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

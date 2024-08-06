import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { View, useWindowDimensions } from "react-native";
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
        }}
        name="Prueba"
        component={Prueba}
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
          height: 10, // Ajusta la altura de la cabecera según tus necesidades
        },
        headerTitle: "", // Quitar título
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
          drawerLabel: "Prueba",
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: 200,
          backgroundColor: globalColors.primary,
          margin: 30,
          borderRadius: 50,
        }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

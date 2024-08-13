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

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  Home: undefined;
  ProductScreen: { productId: string };
  CategoriasScreen: undefined;
  CategoriaScreen: { categoryId: string };
  MaterialsScreen: undefined;
  MaterialForm: { materialId: string };
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
    </Drawer.Navigator>
  );
};

// Custom Drawer Content
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

// Styles
const styles = StyleSheet.create({
  profileContainer: {
    height: 200,
    backgroundColor: globalColors.primary,
    marginVertical: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default HomeStackNavigator;

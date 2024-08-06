import React from "react";
import { Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { FAB } from "../../components/ui/FAB";
import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { RootStackParams } from "../../navigator/StackNavigator";
import { HamburgerMenu } from "../../components/ui/HamburgerMenu";
import { RootStackParams } from "../../navigator/SideMenuNavigator";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <>
      <MainLayout title="Productos" subTitle="Lista de Productos">
        <Text>Home Screen </Text>
      </MainLayout>
      <FAB
        onPress={() =>
          // navigation.navigate("ProductScreen", { productId: "new" })
          navigation.navigate("RegisterScreen")
        }
        style={{ position: "absolute", bottom: 30, right: 20 }}
      />
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { FAB } from "../../components/ui/FAB";
import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { RootStackParams } from "../../navigator/StackNavigator";
import { HamburgerMenu } from "../../components/ui/HamburgerMenu";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { getProducts } from "../../../actions/product-actions";
import { Product } from "../../../domain/entities/product";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";
import { useQuery } from "@tanstack/react-query";

export const HomeScreen = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <>
      <MainLayout title="Productos" subTitle="Lista de Productos">
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductList products={products!} />
        )}
      </MainLayout>
      <FAB
        onPress={() =>
          // navigation.navigate("ProductScreen", { productId: "new" })
          navigation.navigate("ProductScreen", { productId: "new" })
        }
        style={{ position: "absolute", bottom: 30, right: 20 }}
      />
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { FAB } from "../../components/ui/FAB";
import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { RootStackParams } from "../../navigator/StackNavigator";
import { HamburgerMenu } from "../../components/ui/HamburgerMenu";
import { getProducts } from "../../../actions/product-actions";
import { Product } from "../../../domain/entities/product";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@ui-kitten/components";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { CustomView } from "../../components/ui/CustomView";

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
      <CustomView>
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <>
            <ProductList products={products!} />
          </>
        )}
      </CustomView>
      <FAB
        onPress={() =>
          navigation.navigate("ProductScreen", { productId: "new" })
        }
        style={{ position: "absolute", bottom: 30, right: 20 }}
      />
    </>
  );
};

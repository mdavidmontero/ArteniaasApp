import React from "react";
import { Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../actions/categories.actions";
import { CategoriasList } from "../../components/categories/CategoriasList";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { FAB } from "../../components/ui/FAB";
import { CustomView } from "../../components/ui/CustomView";
import { HamburgerMenu } from "../../components/ui/HamburgerMenu";

export const CategoriasScreen = () => {
  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategories,
  });
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <>
      <CustomView>
        <CategoriasList categorias={categorias!} />
      </CustomView>
      <FAB
        onPress={() =>
          navigation.navigate("CategoriaScreen", { categoryId: "new" })
        }
        style={{ position: "absolute", bottom: 30, right: 20 }}
      />
    </>
  );
};

import { useQueryClient } from "@tanstack/react-query";
import { Category } from "../../../domain/entities/category";
import { useState } from "react";
import { Layout, List } from "@ui-kitten/components";
import { CategoriasCard } from "./CategoriasCard";
import { RefreshControl } from "react-native";

interface Props {
  categorias: Category[];
}

export const CategoriasList = ({ categorias }: Props) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    queryClient.invalidateQueries({ queryKey: ["categorias"] });
    setIsRefreshing(false);
  };
  return (
    <List
      data={categorias}
      numColumns={0}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <CategoriasCard categoria={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

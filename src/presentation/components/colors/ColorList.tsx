import { useQueryClient } from "@tanstack/react-query";
import { Category } from "../../../domain/entities/category";
import { useState } from "react";
import { Layout, List } from "@ui-kitten/components";
import { RefreshControl } from "react-native";
import { ColorsCard } from "./ColorCard";
import { Colors } from "../../../domain/entities/colors";

interface Props {
  colores: Colors[];
}

export const ColorsList = ({ colores }: Props) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    queryClient.invalidateQueries({ queryKey: ["colores"] });
    setIsRefreshing(false);
  };
  return (
    <List
      data={colores}
      numColumns={0}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <ColorsCard color={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

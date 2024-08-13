import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { Card, Layout, List } from "@ui-kitten/components";
import MaterialCard from "./MaterialCard";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Materials } from "../../../domain/entities/materials";

interface Props {
  materiales: Materials[];
}
export const MaterialList = ({ materiales }: Props) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    queryClient.invalidateQueries({ queryKey: ["materiales"] });
    setIsRefreshing(false);
  };

  return (
    <List
      data={materiales}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <MaterialCard material={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

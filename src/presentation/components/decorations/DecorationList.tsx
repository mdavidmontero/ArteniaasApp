import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { Card, Layout, List } from "@ui-kitten/components";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Materials } from "../../../domain/entities/materials";
import { Decoration } from "../../../domain/entities/decoration";
import DecorationCard from "./DecorationCard";

interface Props {
  decoraciones: Decoration[];
}
export const DecorationList = ({ decoraciones }: Props) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    queryClient.invalidateQueries({ queryKey: ["decoraciones"] });
    setIsRefreshing(false);
  };

  return (
    <List
      data={decoraciones}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <DecorationCard decoracion={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

import React from "react";
import { Text } from "react-native";
import { Link, usePathname } from "expo-router";
import { Button } from "@ui-kitten/components";
import { MainLayout } from "../../src/presentation/layouts/MainLayout";

export default function Home() {
  return (
    <>
      <MainLayout title="Productos" subTitle="Lista de Productos">
        <Text>Home Screen</Text>
      </MainLayout>
      <Link
        href="/products"
        style={{ position: "absolute", bottom: 30, right: 20 }}
        asChild
      >
        <Button>Nuevo</Button>
      </Link>
    </>
  );
}

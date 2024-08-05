import React, { useEffect, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from "@ui-kitten/components";
import { Formik } from "formik";
import { ScrollView } from "react-native";
import { ProductImages } from "../components/products/ProductImages";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MainLayout } from "../layouts/MainLayout";

export const ProductScreen = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={"product1"} subTitle={`Precio `}>
          <ScrollView style={{ flex: 1 }}>
            {/* Imagenes de Productos */}
            <Layout
              style={{
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProductImages images={[]} />
            </Layout>
            {/* Formulario */}
            <Layout style={{ marginHorizontal: 10 }}>
              <Input
                label={"Titulo"}
                style={{ marginVertical: 5 }}
                // value={values.title}
                onChangeText={handleChange("title")}
              />
              <Input
                label={"Slug"}
                // value={values.slug}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange("slug")}
              />
              <Input
                label={"Descripción"}
                // value={values.description}
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange("description")}
              />
            </Layout>
            {/* Precio e inventario */}
            <Layout
              style={{
                marginVertical: 5,
                marginHorizontal: 15,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Input
                label={"Precio"}
                // value={values.price.toString()}
                onChangeText={handleChange("price")}
                style={{ flex: 1 }}
              />
              <Input
                label={"Inventario"}
                // value={values.stock.toString()}
                onChangeText={handleChange("stock")}
                style={{ flex: 1 }}
              />
            </Layout>

            <Button
              accessoryLeft={<FontAwesome size={28} name="save" white />}
              style={{ margin: 15 }}
              onPress={() => handleSubmit()}
            >
              Guardar
            </Button>

            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};

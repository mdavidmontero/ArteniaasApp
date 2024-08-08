import React, { useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { Modal, StyleSheet } from "react-native";
import { Formik } from "formik";
import { ScrollView } from "react-native";
import { ProductImages } from "../../components/products/ProductImages";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MainLayout } from "../../layouts/MainLayout";
import { Product } from "../../../domain/entities/product";
import { cameraAdapter } from "../../../config/adapters/camera-adapter";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../../actions/product-actions";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props extends StackScreenProps<RootStackParams, "ProductScreen"> {}
export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const queryClient = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ["product", productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  const handleChange = async (data: Product) => {
    if (product?.id) {
      await updateProduct(product?.id, data);
      queryClient.invalidateQueries({ queryKey: ["product", data.id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } else {
      await createProduct(data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }
  return (
    <Formik initialValues={product} onSubmit={handleChange}>
      {({ handleChange, handleSubmit, values, setFieldValue }) => (
        <MainLayout
          title={product.name}
          subTitle={product.price.toString()}
          rightAction={async () => {
            try {
              const photos = await cameraAdapter.getPicturesFromLibrary();
              if (photos.length > 0) {
                setFieldValue("image", [...values.image, ...photos]);
              } else {
                console.warn("No images selected");
              }
            } catch (error) {
              console.error("Error fetching images:", error);
            }
          }}
          rightActionIcon="image-outline"
          showBackButton={true}
        >
          <ScrollView style={{ flex: 1 }}>
            <Layout
              style={{
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProductImages images={values.image} />
            </Layout>
            <Layout style={{ marginHorizontal: 10 }}>
              <Input
                label={"Nombre"}
                style={{ marginVertical: 5 }}
                value={values.name}
                onChangeText={handleChange("name")}
              />

              <Input
                label={"Descripción"}
                value={values.descripcion}
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange("descripcion")}
              />
            </Layout>
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
                keyboardType="numeric"
                value={values.price.toString()}
                onChangeText={handleChange("price")}
                style={{ flex: 1 }}
              />

              <Input
                label={"Nombre dibujo"}
                value={values.nombreDibujo}
                onChangeText={handleChange("nombreDibujo")}
                style={{ flex: 1 }}
              />
            </Layout>
            <Layout style={{ marginHorizontal: 10 }}>
              <Text>Seleccione una Categoria</Text>
              <Picker
                style={styles.picker}
                selectedValue={values.category}
                onValueChange={(itemValue) =>
                  setFieldValue("category", itemValue)
                }
              >
                <Picker.Item label="Seleccione una Opcion" value="" />
                <Picker.Item label="Opción 2" value="opcion2" />
                <Picker.Item label="Opción 3" value="opcion3" />
              </Picker>
            </Layout>
            <Layout
              style={{
                marginVertical: 5,
                marginHorizontal: 15,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Input
                label={"Ancho"}
                keyboardType="numeric"
                value={values.ancho.toString()}
                onChangeText={handleChange("ancho")}
                style={{ flex: 1 }}
              />
              <Input
                label={"Alto"}
                keyboardType="numeric"
                value={values.alto.toString()}
                onChangeText={handleChange("alto")}
                style={{ flex: 1 }}
              />
            </Layout>

            <Layout style={{ marginHorizontal: 10 }}>
              <Text>Seleccione los Colores</Text>
              <Picker
                style={styles.picker}
                selectedValue={values.colores}
                onValueChange={(itemValue) =>
                  setFieldValue("colores", itemValue)
                }
              >
                <Picker.Item label="Seleccione" value="" />
                <Picker.Item label="Opción 2" value="opcion2" />
                <Picker.Item label="Opción 3" value="opcion3" />
              </Picker>
            </Layout>

            <Layout style={{ marginHorizontal: 10 }}>
              <Text>Seleccione los Materiales</Text>
              <Picker
                style={styles.picker}
                selectedValue={values.material}
                onValueChange={(itemValue) => {
                  setFieldValue("material", itemValue);
                }}
              >
                <Picker.Item label="Seleccione" value="" />
                <Picker.Item label="Opción 2" value="opcion2" />
                <Picker.Item label="Opción 3" value="opcion3" />
              </Picker>
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

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#e2e8f0",
  },
});

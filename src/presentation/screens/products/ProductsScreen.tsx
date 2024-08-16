import React, { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button, Input, Layout, Text, ListItem } from "@ui-kitten/components";
import { StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
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
import { StackScreenProps } from "@react-navigation/stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { initialValues } from "../../../types";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { getCategories } from "../../../actions/categories.actions";
import { getColors } from "../../../actions/colors.actions";
import { Colors } from "../../../domain/entities/colors";
import { getMaterials } from "../../../actions/materials.actions";
import { Materials } from "../../../domain/entities/materials";

interface Props extends StackScreenProps<RootStackParams, "ProductScreen"> {}

export const ProductScreen = ({ route, navigation }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const [selectedColors, setSelectedColors] = useState<Colors[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Materials[]>([]);
  const queryClient = useQueryClient();
  // Todo: Pasar las consultas con react query a un customHook

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
    enabled: productIdRef.current !== "new",
  });

  const { data: category } = useQuery({
    queryKey: ["categoryid"],
    queryFn: getCategories,
  });

  const { data: colores } = useQuery({
    queryKey: ["coloresId"],
    queryFn: getColors,
  });

  const { data: materiales } = useQuery({
    queryKey: ["materialesId"],
    queryFn: getMaterials,
  });

  useEffect(() => {
    if (product && colores && materiales) {
      const selectedProductColors = product.colores
        .map((colorId) => colores.find((color) => color.id === colorId))
        .filter(Boolean) as Colors[];

      const selectedProductMaterials = product.material
        .map((materialId) =>
          materiales.find((material) => material.id === materialId)
        )
        .filter(Boolean) as Materials[];

      setSelectedColors(selectedProductColors);
      setSelectedMaterials(selectedProductMaterials);
    }
  }, [product, colores, materiales]);

  const handleAddColor = (color: Colors) => {
    if (!selectedColors.some((c) => c.id === color.id)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleRemoveColor = (colorId: string) => {
    setSelectedColors(selectedColors.filter((c) => c.id !== colorId));
  };

  const handleAddMaterial = (material: Materials) => {
    if (!selectedMaterials.some((m) => m.id === material.id)) {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const handleRemoveMaterial = (materialId: string) => {
    setSelectedMaterials(selectedMaterials.filter((m) => m.id !== materialId));
  };

  const handleChange = async (data: Product) => {
    const productData = {
      ...data,
      colores: selectedColors.map((color) => color.id),
      material: selectedMaterials.map((material) => material.id),
    };

    if (product?.id) {
      await updateProduct(product?.id, productData);
      queryClient.invalidateQueries({ queryKey: ["product", data.id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } else {
      await createProduct(productData);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }

    navigation.goBack();
  };

  const validarData = () => {
    if (!product) {
      return initialValues;
    } else {
      return product;
    }
  };

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <Formik initialValues={validarData()} onSubmit={handleChange}>
      {({ handleChange, handleSubmit, values, setFieldValue }) => (
        <MainLayout
          title={product?.name || "Nuevo Producto"}
          subTitle={product?.price.toString() || "0"}
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
          <ScrollView style={styles.scrollView}>
            <Layout style={styles.container}>
              <Layout style={styles.imageContainer}>
                <ProductImages images={values.image} />
              </Layout>

              <Input
                label={"Nombre"}
                style={styles.input}
                value={values.name}
                onChangeText={handleChange("name")}
              />

              <Input
                label={"Descripción"}
                value={values.descripcion}
                multiline
                numberOfLines={5}
                style={styles.input}
                onChangeText={handleChange("descripcion")}
              />

              <Layout style={styles.row}>
                <Input
                  label={"Precio"}
                  keyboardType="numeric"
                  value={values.price.toString()}
                  onChangeText={handleChange("price")}
                  style={styles.inputRow}
                />

                <Input
                  label={"Nombre dibujo"}
                  value={values.nombreDibujo}
                  onChangeText={handleChange("nombreDibujo")}
                  style={styles.inputRow}
                />
              </Layout>

              <Text style={styles.textLabel}>Seleccione una Categoría</Text>
              <Picker
                style={styles.picker}
                selectedValue={values.category}
                onValueChange={(itemValue) =>
                  setFieldValue("category", itemValue)
                }
              >
                {category?.map((categories) => (
                  <Picker.Item
                    key={categories.id}
                    label={categories.name}
                    value={categories.id}
                  />
                ))}
              </Picker>

              <Layout style={styles.row}>
                <Input
                  label={"Ancho"}
                  keyboardType="numeric"
                  value={values.ancho.toString()}
                  onChangeText={handleChange("ancho")}
                  style={styles.inputRow}
                />
                <Input
                  label={"Alto"}
                  keyboardType="numeric"
                  value={values.alto.toString()}
                  onChangeText={handleChange("alto")}
                  style={styles.inputRow}
                />
              </Layout>

              <Text style={styles.textLabel}>Seleccione los Colores</Text>
              <Picker
                style={styles.picker}
                selectedValue=""
                onValueChange={(itemValue) =>
                  handleAddColor(
                    colores?.find((color) => color.id === itemValue)!
                  )
                }
              >
                <Picker.Item label="Seleccione un Color" value="" />
                {colores?.map((color) => (
                  <Picker.Item
                    key={color.id}
                    label={color.name}
                    value={color.id}
                  />
                ))}
              </Picker>

              <Layout>
                {selectedColors.map((color) => (
                  <ListItem
                    key={color.id}
                    title={color.name}
                    accessoryRight={() => (
                      <FontAwesome
                        name="trash"
                        size={25}
                        color="red"
                        onPress={() => handleRemoveColor(color.id)}
                      />
                    )}
                  />
                ))}
              </Layout>

              <Text style={styles.textLabel}>Seleccione los Materiales</Text>
              <Picker
                style={styles.picker}
                selectedValue=""
                onValueChange={(itemValue) =>
                  handleAddMaterial(
                    materiales?.find((material) => material.id === itemValue)!
                  )
                }
              >
                <Picker.Item label="Seleccione un Material" value="" />
                {materiales?.map((material) => (
                  <Picker.Item
                    key={material.id}
                    label={material.name}
                    value={material.id}
                  />
                ))}
              </Picker>

              <Layout>
                {selectedMaterials.map((material) => (
                  <ListItem
                    key={material.id}
                    title={material.name}
                    accessoryRight={() => (
                      <FontAwesome
                        name="trash"
                        size={25}
                        color="red"
                        onPress={() => handleRemoveMaterial(material.id)}
                      />
                    )}
                  />
                ))}
              </Layout>

              <Button
                onPress={() => handleSubmit()}
                style={styles.submitButton}
              >
                Guardar Producto
              </Button>
            </Layout>
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputRow: {
    flex: 1,
    marginHorizontal: 5,
  },
  textLabel: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
  },
  submitButton: {
    marginVertical: 20,
    marginBottom: 100,
  },
});

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";
import { Product } from "../domain/entities/product";
import { db } from "../config/firebase/app";
import { storage } from "../config/firebase/app";

export const uploadImages = async (images: string[]): Promise<string[]> => {
  const uploadedUrls: string[] = [];

  for (const image of images) {
    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(
      storage,
      `products/${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    );
    await uploadBytes(storageRef, blob);

    const downloadUrl = await getDownloadURL(storageRef);
    uploadedUrls.push(downloadUrl);
  }

  return uploadedUrls;
};

const productosRef = collection(db, "productos");

export const createProduct = async (producto: Product): Promise<void> => {
  try {
    const imageUrls = await uploadImages(producto.image);

    const docRef = await addDoc(productosRef, {
      ...producto,
      image: imageUrls,
    });

    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el producto");
  }
};

export const getProducts = async (): Promise<Product[] | null> => {
  try {
    const q = query(productosRef, orderBy("name"));
    const querySnapshot = await getDocs(q);
    const productos: Product[] = querySnapshot.docs.map(
      (doc) => doc.data() as Product
    );
    return productos;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los productos");
  }
};

export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const productoDocRef = doc(db, "productos", productId);
    const productoDocSnap = await getDoc(productoDocRef);
    if (productoDocSnap.exists()) {
      return productoDocSnap.data() as Product;
    } else {
      console.error("No se encontró el producto con el ID:", productId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  newData: Partial<Product>
): Promise<void> => {
  try {
    const productoDoc = doc(db, "productos", productId);
    await updateDoc(productoDoc, newData);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

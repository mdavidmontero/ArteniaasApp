import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Category } from "../domain/entities/category";
import { db } from "../config/firebase/app";
import { CategoryMaper } from "../infrastructure/mappers/category.mapper";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Colors } from "../domain/entities/colors";
import { ColorsMappper } from "../infrastructure/mappers/colors.mapper";
const colorsRef = collection(db, "colors");
export const createColors = async (color: Colors): Promise<void> => {
  try {
    const docRef = await addDoc(colorsRef, color);
    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el color");
  }
};

export const getColors = async (): Promise<Colors[]> => {
  try {
    const q = query(colorsRef, orderBy("name"));
    const querySnapshot = await getDocs(q);
    const colors = querySnapshot.docs.map((doc) => doc.data() as Colors);
    const data = colors.map((color) => ColorsMappper.ColorToEntity(color));
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los colores");
  }
};

export const getcolorById = async (colorId: string): Promise<Colors | null> => {
  try {
    const colorDocRef = doc(db, "colors", colorId);
    const colorDocSnap = await getDoc(colorDocRef);
    if (colorDocSnap.exists()) {
      return ColorsMappper.ColorToEntity(colorDocSnap.data() as Colors);
    }
    return null;
  } catch (error) {
    console.error("Error al obtener el color por ID:", error);
    throw error;
  }
};

export const updateColor = async (
  colorId: string,
  newData: Partial<Colors>
): Promise<void> => {
  try {
    const colorDoc = doc(db, "colors", colorId);
    await updateDoc(colorDoc, newData);
  } catch (error) {
    console.error("Error al actualizar los colores:", error);
    throw error;
  }
};
export const deleteImage = async (imageUrl: string) => {
  const storage = getStorage();
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
};

export const deleteColor = async (colorId: string): Promise<void> => {
  try {
    const colorDoc = doc(db, "colors", colorId);
    await deleteDoc(colorDoc);
  } catch (error) {
    console.error("Error al eliminar el color:", error);
    throw error;
  }
};

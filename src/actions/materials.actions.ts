import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase/app";
import { storage } from "../config/firebase/app";
import { Materials } from "../domain/entities/materials";
import { MaterialsMapper } from "../infrastructure/mappers/materials.mapper";
const materialesRef = collection(db, "materiales");

export const uploadImage = async (image: string): Promise<string> => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(
      storage,
      `materiales/${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    );

    await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const createMaterial = async (material: Materials): Promise<void> => {
  try {
    const imageUrls = await uploadImage(material.image);

    const docRef = await addDoc(materialesRef, {
      ...material,
      image: imageUrls,
    });

    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el material");
  }
};

export const getMaterials = async (): Promise<Materials[]> => {
  try {
    const q = query(materialesRef, orderBy("name"));
    const querySnapshot = await getDocs(q);
    const materiales = querySnapshot.docs.map((doc) => doc.data() as Materials);
    const data = materiales.map((material) =>
      MaterialsMapper.MaterialsToEntity(material)
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los materiales");
  }
};

export const getMaterialById = async (
  materialId: string
): Promise<Materials | null> => {
  try {
    const materialDocRef = doc(db, "materiales", materialId);
    const materialDocSnap = await getDoc(materialDocRef);
    if (materialDocSnap.exists()) {
      return MaterialsMapper.MaterialsToEntity(
        materialDocSnap.data() as Materials
      );
    }
    return null;
  } catch (error) {
    console.error("Error al obtener el material por ID:", error);
    throw error;
  }
};

export const updateMaterial = async (
  materialId: string,
  newData: Partial<Materials>
): Promise<void> => {
  try {
    const materialDoc = doc(db, "materiales", materialId);
    await updateDoc(materialDoc, newData);
  } catch (error) {
    console.error("Error al actualizar el material:", error);
    throw error;
  }
};

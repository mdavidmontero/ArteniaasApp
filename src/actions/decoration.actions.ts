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
import { Decoration } from "../domain/entities/decoration";
import { DecorationsMapper } from "../infrastructure/mappers/decoration.mapper";
const decorationsRef = collection(db, "decorations");

export const uploadImage = async (image: string): Promise<string> => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(
      storage,
      `decorations/${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    );

    await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const createDecorations = async (
  decoration: Decoration
): Promise<void> => {
  try {
    const imageUrls = await uploadImage(decoration.imagen);

    const docRef = await addDoc(decorationsRef, {
      ...decoration,
      image: imageUrls,
    });

    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear la decoración");
  }
};

export const getDecorations = async (): Promise<Decoration[]> => {
  try {
    const q = query(decorationsRef, orderBy("descripcion"));
    const querySnapshot = await getDocs(q);
    const decorations = querySnapshot.docs.map(
      (doc) => doc.data() as Decoration
    );
    const data = decorations.map((decoration) =>
      DecorationsMapper.DecorationsToEntity(decoration)
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener la decoración");
  }
};

export const getDecorationById = async (
  decorationId: string
): Promise<Decoration | null> => {
  try {
    const decorationDocRef = doc(db, "decorations", decorationId);
    const decorationDocSnap = await getDoc(decorationDocRef);
    if (decorationDocSnap.exists()) {
      return DecorationsMapper.DecorationsToEntity(
        decorationDocSnap.data() as Decoration
      );
    }
    return null;
  } catch (error) {
    console.error("Error al obtener la decoración por ID:", error);
    throw error;
  }
};

export const updateDecoration = async (
  decorationId: string,
  newData: Partial<Decoration>
): Promise<void> => {
  try {
    const decorationDoc = doc(db, "decorations", decorationId);
    await updateDoc(decorationDoc, newData);
  } catch (error) {
    console.error("Error al actualizar la decoración:", error);
    throw error;
  }
};

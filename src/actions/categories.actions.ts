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
const categoriesRef = collection(db, "categorias");
export const createCategory = async (category: Category): Promise<void> => {
  try {
    const docRef = await addDoc(categoriesRef, category);
    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear la categoria");
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const q = query(categoriesRef, orderBy("name"));
    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map((doc) => doc.data() as Category);
    const data = categories.map((category) =>
      CategoryMaper.CategoryToEntity(category)
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las categorias");
  }
};

export const getcategoryById = async (
  categoryId: string
): Promise<Category | null> => {
  try {
    const categoryDocRef = doc(db, "categorias", categoryId);
    const categoryDocSnap = await getDoc(categoryDocRef);
    if (categoryDocSnap.exists()) {
      return CategoryMaper.CategoryToEntity(categoryDocSnap.data() as Category);
    }
    return null;
  } catch (error) {
    console.error("Error al obtener la categoria por ID:", error);
    throw error;
  }
};

export const updateCategory = async (
  categoryId: string,
  newData: Partial<Category>
): Promise<void> => {
  try {
    const categoryDoc = doc(db, "categorias", categoryId);
    await updateDoc(categoryDoc, newData);
  } catch (error) {
    console.error("Error al actualizar la categoria:", error);
    throw error;
  }
};
export const deleteImage = async (imageUrl: string) => {
  const storage = getStorage();
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
};

export const deletecategory = async (categoryId: string): Promise<void> => {
  try {
    const categoryDoc = doc(db, "categorias", categoryId);
    await deleteDoc(categoryDoc);
  } catch (error) {
    console.error("Error al eliminar la categoria:", error);
    throw error;
  }
};

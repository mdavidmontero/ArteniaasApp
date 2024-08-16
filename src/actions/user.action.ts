import {
  getAuth,
  deleteUser,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  Firestore,
  DocumentData,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentSnapshot,
  CollectionReference,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase/app";
import { User } from "../domain/entities/user";
const usuariosRef: CollectionReference<DocumentData> = collection(
  db,
  "usuarios"
);

export async function crearUsuario(usuario: User): Promise<void> {
  try {
    const docuRef = doc(db, `usuarios/${usuario.id}`);
    await setDoc(docuRef, usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

export async function crearUsuarioYAutenticacion(
  usuario: User,
  password: string
): Promise<void> {
  let userCredential: UserCredential | null = null;
  try {
    // Crear usuario en la autenticación de Firebase
    const auth = getAuth();
    userCredential = await createUserWithEmailAndPassword(
      auth,
      usuario.correo,
      password
    );

    // Guardar información adicional en Firestore
    if (userCredential.user) {
      const { uid } = userCredential.user;
      const usuarioConId: User = { ...usuario, id: uid };
      const docRef = doc(db, "usuarios", uid);
      await setDoc(docRef, usuarioConId);
    }
  } catch (error) {
    // Si hay un error, eliminar el usuario recién creado en la autenticación si es necesario
    if (userCredential && userCredential.user) {
      await userCredential.user.delete();
    }
    console.error("Error al crear usuario y autenticación:", error);
    throw error;
  }
}

export async function obtenerUsuarioPorId(
  userId: string
): Promise<User | null> {
  try {
    const userDocRef = doc(db, "usuarios", userId);
    const userDocSnap: DocumentSnapshot<DocumentData> = await getDoc(
      userDocRef
    );
    if (userDocSnap.exists()) {
      return userDocSnap.data() as User;
    } else {
      console.error("No se encontró el usuario con el ID:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
}

export async function actualizarUsuario(
  userId: string,
  newData: Partial<User>
): Promise<void> {
  try {
    const userDocRef = doc(db, "usuarios", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, newData);
    } else {
      console.error("No se encontró el usuario con el ID:", userId);
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
}

export async function eliminarUsuario(userId: string): Promise<void> {
  try {
    // Eliminar en Firestore
    const userDoc = doc(db, "usuarios", userId);
    await deleteDoc(userDoc);

    // Eliminar en Autenticación (si es necesario)
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
}

export async function obtenerUsuarios(): Promise<User[] | null> {
  try {
    const q = query(usuariosRef, orderBy("createdAt"));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    const usuarios: User[] = querySnapshot.docs.map(
      (doc) => doc.data() as User
    );
    return usuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return null;
  }
}

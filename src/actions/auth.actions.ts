import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { User as Users } from "../domain/entities/user";
import { crearUsuario } from "./user.action";

const auth = getAuth();

export const registerUser = async (user: Users): Promise<string | null> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      user.correo,
      user.password
    );
    const usuario: Users = {
      id: userCredential.user.uid,
      correo: user.correo,
      nombre: user.nombre,
      password: user.password,
      roles: user.roles,
      telefono: user.telefono,
      fotoPerfil: "",
    };
    await crearUsuario(usuario);
    return userCredential.user.uid;
  } catch (error: any) {
    console.log(error);
    if (error.code === "auth/email-already-in-use") {
      throw new Error("El correo electrónico ya está en uso.");
    }
    throw error;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.uid;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("El correo electrónico ya está en uso.");
    }
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export const onAuthStateChangedListener = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

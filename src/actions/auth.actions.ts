import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  RolUsuario,
  UserRegisro,
  User as Users,
} from "../domain/entities/user";
import { crearUsuario } from "./user.action";

const auth = getAuth();

export const registerUser = async (
  nombre: string,
  correo: string,
  password: string,
  telefono: string,
  roles: RolUsuario
): Promise<string | null> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      correo,
      password
    );
    const usuario: UserRegisro = {
      id: userCredential.user.uid,
      correo,
      nombre,
      roles,
      telefono,
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
  await signOut(auth);
};

export const onAuthStateChangedListener = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

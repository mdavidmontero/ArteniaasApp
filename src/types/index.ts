import { Product } from "../domain/entities/product";
import { RolUsuario } from "../domain/entities/user";

export const initialValues: Product = {
  id: "",
  name: "",
  descripcion: "",
  price: 0,
  nombreDibujo: "",
  category: "",
  ancho: 0,
  alto: 0,
  colores: [],
  material: [],
  image: [],
};

export type registraUsuario = {
  nombre: string;
  correo: string;
  telefono: string;
  roles: RolUsuario.CLIENTE;
  fotoPerfil: string;
};

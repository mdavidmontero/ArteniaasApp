export interface User {
  id: string;
  correo: string;
  password: string;
  nombre: string;
  fotoPerfil?: string;
  telefono?: string;
  roles: RolUsuario;
}

export enum RolUsuario {
  ADMIN = "ADMIN",
  CLIENTE = "CLIENTE",
}

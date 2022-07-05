import { IUsuario } from "./usuario.interface";

export interface IShopData {
    nombre: string,
    descripcion: string,
    direccion: string,
    telefono: string,
    sitio_web: string,
    facebook_url: string,
    instagram_url: string,
    email: string,
    banner_imagen_url: string,
    owner: IUsuario,
}
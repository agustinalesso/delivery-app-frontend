export interface IUsuario {
    nombre: string,
    apellido: string,
    email: string,
    direccion: string,
    telefono?: string,
    genero?: string,
    fecha_nacimiento?: string,
    google_uid?: string,
    imagen_perfil?: string | null,
    imagen_nombreArchivo?: string | null,
    password?: string,
    passwordconf?: string,
    roles?: string[]
}
export interface IUsuario {
    nombre: string,
    apellido: string,
    email: string,
    direccion: string,
    telefono?: string,
    genero?: string,
    fecha_nacimiento?: Date,
    google_uid?: string,
    imagen_perfil?: string,
    password?: string,
    passwordconf?: string,
    roles?: string[]
}
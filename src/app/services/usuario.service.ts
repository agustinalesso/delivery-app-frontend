import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IUsuario } from "../interfaces/usuario.interface";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor( private _http: HttpClient ){}
    obtenerDatosUsuario = (uid:string | undefined) => this._http.get<any>(`${environment.API_URL}user/${uid}`);
    actualizarDatosUsuario = (uid:string | undefined, body:IUsuario) => this._http.put<any>(`${environment.API_URL}user/${uid}`,body);

}
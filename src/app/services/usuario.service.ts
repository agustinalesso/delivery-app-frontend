import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor( private _http: HttpClient ){}
    obtenerDatosUsuario = (uid:string | undefined) => this._http.get<any>(`http://localhost:1973/user/${uid}`);

}
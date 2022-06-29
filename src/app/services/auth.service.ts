import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor( 
        private _http: HttpClient,
        private _firebase: AngularFireAuth
    ){}

    registerUser = (usuario:any) => this._http.post('http://localhost:1973/auth/register',usuario);
    loginUser = (email:string,password:string) => this._firebase.signInWithEmailAndPassword(email,password);
    logout = () => this._firebase.signOut();
}
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class GalletitaService {
    constructor( private _cookie: CookieService ){}
    public setCookie = (key:string,value:string) => this._cookie.set(key,btoa(JSON.stringify(value)),{ path: '/' });
    public getCookie = (key:string) => JSON.parse(atob(this._cookie.get(key)));
    public checkCookie = (key:string) => this._cookie.check(key);
    public deleteCookie = (key:string) => this._cookie.delete(key,'/');

    public get esAdmin(): boolean {
        const cookie = this.getCookie('_lg');
        return cookie.roles?.filter(r => r === 'Administrador').length === 1;
    }
}
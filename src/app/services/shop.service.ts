import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ShopService {
    constructor(
        private http: HttpClient
    ){}

    getShopData = (uid:string) => this.http.get(`${environment.API_URL}my-shop-data/${uid}`);

}
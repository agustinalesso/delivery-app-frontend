import { EventEmitter, Injectable } from "@angular/core";
import { IShopData } from "../interfaces/shop.interface";
import { IUsuario } from "../interfaces/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class GlobalProviderService {

  constructor(){}

  private usuarioDatosEventEmitter: EventEmitter<IUsuario> = new EventEmitter();
  private shopDataEmitter: EventEmitter<IShopData> = new EventEmitter();

  public escucharDatosUsuario = () => this.usuarioDatosEventEmitter;
  public escucharDatosShop = () => this.shopDataEmitter;

  public enviarDatosUsuario = (datosUsuario: IUsuario) => this.usuarioDatosEventEmitter.emit(datosUsuario);
  public enviarDatosShop = (datosShop: IShopData) => this.shopDataEmitter.emit(datosShop);

}
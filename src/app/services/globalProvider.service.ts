import { EventEmitter, Injectable } from "@angular/core";
import { IUsuario } from "../interfaces/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class GlobalProviderService {

  constructor(){}

  private usuarioDatosEventEmitter: EventEmitter<IUsuario> = new EventEmitter();

  public escucharDatosUsuario = () => this.usuarioDatosEventEmitter;
  public enviarDatosUsuario = (datosUsuario: IUsuario) => this.usuarioDatosEventEmitter.emit(datosUsuario);

}




















/* import { EventEmitter, Injectable } from "@angular/core";
import { IUsuario } from "../interfaces/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class GlobalProviderService {

  private data: any;
  private newProfileImageEmitter: EventEmitter<string> = new EventEmitter();
  private userEmitter: EventEmitter<IUsuario> = new EventEmitter();

  public setData = (key,value) => {
    this.data[key] = value;
  }
  public getData = (key) => this.data[key];

  public listenNewProfileImage = () => this.newProfileImageEmitter;
  public sendNewProfileImage = (new_image_url:string) => this.newProfileImageEmitter.emit(new_image_url);

  public listenUser = () => this.userEmitter;
  public sendUser = (usuario:IUsuario) => this.userEmitter.emit(usuario);
  
  constructor(){}
} */
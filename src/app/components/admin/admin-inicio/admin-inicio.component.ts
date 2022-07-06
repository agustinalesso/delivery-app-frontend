import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { IShopData } from 'src/app/interfaces/shop.interface';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GalletitaService } from 'src/app/services/galletita.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-admin-inicio',
  templateUrl: './admin-inicio.component.html',
  styles: [
  ]
})
export class AdminInicioComponent implements OnInit {

  usuario: IUsuario;
  shop: IShopData = {
    nombre: '',
    descripcion: '',
    direccion: '',
    telefono: '',
    sitio_web: '',
    facebook_url: '',
    instagram_url: '',
    banner_imagen_url: '',
    perfil_imagen_url: '',
  }

  constructor(
    private _galletita: GalletitaService,
    private _shop: ShopService
  ) {}

  ngOnInit(): void {
    this.usuario = this._galletita.getCookie('_lg');
    if(this.usuario){
      this._shop.getShopData(this.usuario.google_uid).subscribe( (response:any) => {
        if(response.myshop){
          this.shop = response.myshop;
        }
      })
    }
  }

  enviarFormulario(formulario: NgForm){
    if(formulario.invalid) return;
    console.log(this.shop)
    //Logica para enviar al backend
    // => ...
  }

}

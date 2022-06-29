import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GalletitaService } from 'src/app/services/galletita.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styles: [
  ]
})
export class MisDatosComponent implements OnInit {

  usuario: IUsuario;

  constructor(
    private _galletita: GalletitaService
  ){}

  get haySesion(){
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    this.usuario = this._galletita.getCookie('_lg');
  }

  onSubmit(formulario: NgForm){
    console.log(formulario);
    console.log(this.usuario);
  }

}

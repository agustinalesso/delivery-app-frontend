import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GalletitaService } from 'src/app/services/galletita.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styles: [
  ]
})
export class MisDatosComponent implements OnInit {

  usuario: IUsuario;

  constructor(
    private _galletita: GalletitaService,
    private _usuario: UsuarioService
  ){}

  get haySesion(){
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    this.usuario = this._galletita.getCookie('_lg');
  }

  onSubmit(formulario: NgForm){
    if(formulario.invalid) return;
    this._usuario.actualizarDatosUsuario(this.usuario.google_uid,this.usuario).subscribe(response => {
      if(response.status === 200){
        this._galletita.setCookie('_lg',response.usuarioActualizado);
      }
    })
  }

}

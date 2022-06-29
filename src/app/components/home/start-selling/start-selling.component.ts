import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GalletitaService } from 'src/app/services/galletita.service';

@Component({
  selector: 'app-start-selling',
  templateUrl: './start-selling.component.html',
  styles: [
  ]
})
export class StartSellingComponent implements OnInit {

  usuario: IUsuario;
  constructor(
    private _galletita: GalletitaService
  ) { }

  ngOnInit(): void {
    this.usuario = this._galletita.getCookie('_lg');
  }

}

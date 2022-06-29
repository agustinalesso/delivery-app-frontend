import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: IUsuario;

  constructor(
    private _auth: AuthService,
    private _galletita: GalletitaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = this._galletita.getCookie('_lg');
  }

  logout(){

    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Está seguro que desea cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._auth.logout().then( r => {
          this._galletita.deleteCookie('_lg');
          this.router.navigate(['home']);
        })
      }
    });
  }

}

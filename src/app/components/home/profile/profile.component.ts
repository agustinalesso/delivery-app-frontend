import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import { GlobalProviderService } from 'src/app/services/globalProvider.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {

  usuario: IUsuario;
  userListener$: Subscription = new Subscription();

  constructor(
    private _auth: AuthService,
    private _galletita: GalletitaService,
    private _usuario: UsuarioService,
    private _globalProvider: GlobalProviderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const cookie = this._galletita.getCookie('_lg');
    this._usuario.obtenerDatosUsuario(cookie.google_uid).subscribe( response => {
      this.usuario = response;
    })
    this.userListener$ = this._globalProvider.listenUser().asObservable().subscribe( response => {
      this.usuario = response;
    } );
  }

  ngOnDestroy(): void {
    this.userListener$.unsubscribe();
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

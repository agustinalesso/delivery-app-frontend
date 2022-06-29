import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nombre:string = '';
  password:string = '';

  constructor(
    private _auth: AuthService,
    private router: Router,
    private _usuario: UsuarioService,
    private _galletita: GalletitaService
  ){}

  onSubmit(formulario: NgForm){

    Swal.fire({
      title: 'Iniciar sesión',
      text: 'Enviando información...',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false
    });

    if(formulario.invalid){
      Swal.fire({
        title: 'Error',
        text: 'Debe completar todos los campos',
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar'
      });
    };

    this._auth.loginUser(this.nombre,this.password).then( respuesta => {
      
      this._usuario.obtenerDatosUsuario(respuesta.user?.uid).subscribe( datosUsuario => {
        this._galletita.setCookie('_lg',datosUsuario);
        Swal.close();
        this.router.navigate(['home']);
      })
      
    }).catch( error => {
      Swal.fire({
        title: 'Error',
        text: 'El correo y/o la contraseña no son válidos',
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar'
      });
    })

  }

}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  //Interfaz ligada al formulario
  usuario: IUsuario = {
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
  };

  constructor( private _auth: AuthService, private router: Router ){}

  onSubmit(formulario: NgForm){

    Swal.fire({
      title: 'Registrar Usuario',
      text: 'Enviando información...',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false
    })

    if(formulario.invalid) return;
    if(this.usuario.password !== this.usuario.passwordconf){
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar'
      })
      return;
    }

    this._auth.registerUser(this.usuario).subscribe( response => {
      Swal.fire({
        title: 'Correcto',
        text: 'Usuario registrado correctamente',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonText: 'Iniciar sesión',
        confirmButtonColor: '#3085d6'
      }).then( result => {
        if(result.value){
          this.router.navigateByUrl('/login');
        }
      });
    })

  }

}

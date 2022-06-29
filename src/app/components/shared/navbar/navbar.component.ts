import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import Swal from 'sweetalert2';
import tippy from 'tippy.js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, AfterViewInit {

  esAdministrador: boolean = false;
  usuarioNombre: string;
  toggleSearch: boolean = false;
  toggleMobileMenu: boolean = false;

  constructor(
    private _galletita: GalletitaService,
    private router: Router
  ){}

  get haySesion(){
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    if(this.haySesion){
      const cookie: IUsuario = this._galletita.getCookie('_lg');
      this.esAdministrador = cookie.roles?.filter(r => r === 'Administrador').length === 1;
      this.usuarioNombre = cookie.nombre;
    }

  }

  ngAfterViewInit(): void {
    tippy('.tippy-iniciarSesion', {
      content: 'Iniciar Sesión',
      placement: 'bottom',
      arrow: true,
      theme: 'dark'
    });

    tippy('.tippy-perfil', {
      content: 'Mi Perfil',
      placement: 'bottom',
      arrow: true,
      theme: 'dark'
    });

    tippy('.tippy-buscar', {
      content: 'Buscar',
      placement: 'bottom',
      arrow: true,
      theme: 'dark'
    });

    tippy('.tippy-vendedor', {
      content: '¿Eres comerciante? ¡Vende con nosotros!',
      placement: 'bottom',
      arrow: true,
      theme: 'dark'
    });
  } 

  onSearch(event:any){
    if(event.key === 'Enter'){
      const queryParams = { query : event.target.value };
      this.router.navigate(['home','search'], { queryParams });
    }
  }

  onToggle(){
    this.toggleMobileMenu = !this.toggleMobileMenu;
  }

}

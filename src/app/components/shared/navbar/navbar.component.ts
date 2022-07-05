import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import { GlobalProviderService } from 'src/app/services/globalProvider.service';
import Swal from 'sweetalert2';
import tippy from 'tippy.js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {

  esAdministrador: boolean = false;
  usuarioNombre: string;
  usuarioImagen: string = 'assets/icon/anonymous.png';
  toggleSearch: boolean = false;
  toggleMobileMenu: boolean = false;
  userSubscription$ : Subscription = new Subscription();

  constructor(
    private _galletita: GalletitaService,
    private router: Router,
    private _globalProvider: GlobalProviderService
  ){}

  get haySesion(){
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    if(this.haySesion){
      const cookie: IUsuario = this._galletita.getCookie('_lg');
      this.esAdministrador = cookie.roles?.filter(r => r === 'Administrador').length === 1;
      this.usuarioNombre = cookie.nombre;
      this.usuarioImagen = cookie.imagen_perfil;
      this.userSubscription$ = this._globalProvider.listenUser().asObservable().subscribe(response => {
        this.usuarioNombre = response.nombre;
        this.usuarioImagen = response.imagen_perfil;
      })
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
  
  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
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

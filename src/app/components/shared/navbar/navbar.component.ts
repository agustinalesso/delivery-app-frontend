import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GalletitaService } from 'src/app/services/galletita.service';
import { GlobalProviderService } from 'src/app/services/globalProvider.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import tippy from 'tippy.js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {

  usuario: IUsuario;
  esAdministrador: boolean = false;
  toggleSearch: boolean = false;
  toggleMobileMenu: boolean = false;
  userSubscription : Subscription = new Subscription();
  logoutSubscription: Subscription = new Subscription();

  constructor(
    private _galletita: GalletitaService,
    private router: Router,
    private _usuario: UsuarioService,
    private _globalProvider: GlobalProviderService
  ){}

  get haySesion(){
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    if(this.haySesion){
      const cookie: IUsuario = this._galletita.getCookie('_lg');

      this._usuario.obtenerDatosUsuario(cookie.google_uid).subscribe(response => {
        this.usuario = response;
        this.esAdministrador = this.usuario.roles?.filter(r => r === 'Administrador').length === 1;
      })

      this.userSubscription = this._globalProvider
        .escucharDatosUsuario()
        .asObservable()
        .subscribe( response => {
          this.usuario = response;
        })

      this.logoutSubscription = this._globalProvider
        .escucharLogout()
        .asObservable()
        .subscribe( response => {
          if(response){
            this.esAdministrador = false;
            this.usuario = {
              nombre: '',
              apellido: '',
              email: '',
              direccion: ''
            }
          }
        })
    }

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.logoutSubscription.unsubscribe();
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

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GalletitaService } from '../services/galletita.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizadorGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private _galletita: GalletitaService
  ){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._galletita.esAdmin;
  }
  
}

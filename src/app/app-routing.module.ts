import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { AutorizadorGuard } from './guards/autorizador.guard';

const irAHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule )
  },
  { 
    path: 'register', 
    loadChildren: () => import('./pages/register/register.module').then( resp => resp.RegisterModule ) 
  },
  { 
    path: 'login', 
    data: { authGuardPipe: irAHome}, 
    loadChildren: () => import('./pages/login/login.module').then( resp => resp.LoginModule ) 
  },
  {
    path: 'admin',
    canActivate: [AngularFireAuthGuard],
    loadChildren: () => import('./pages/admin/admin.module').then( resp => resp.AdminModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

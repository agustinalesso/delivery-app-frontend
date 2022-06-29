import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/components/home/profile/profile.component';
import { StartComponent } from 'src/app/components/home/start/start.component';
import { HomeComponent } from './home.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { FoodHousesComponent } from 'src/app/components/home/food-houses/food-houses.component';
import { MyOrdersComponent } from 'src/app/components/home/my-orders/my-orders.component';
import { StartSellingComponent } from 'src/app/components/home/start-selling/start-selling.component';
import { BuscarComponent } from 'src/app/components/buscar/buscar.component';
import { MisDatosComponent } from 'src/app/components/home/profile/mis-datos/mis-datos.component';
import { MisComprasComponent } from 'src/app/components/home/profile/mis-compras/mis-compras.component';
import { PerfilAvanzadoComponent } from 'src/app/components/home/profile/perfil-avanzado/perfil-avanzado.component';

const irALogin = () => redirectUnauthorizedTo(['login']);
// => /home
//Si no viene nada definido, envío a "start", caso contrario caigo a la ruta hija especificada
const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: '', 
    component: HomeComponent,
    children: [
      {
        path: 'start', 
        component: StartComponent
      },
      {
        path: 'food-houses', 
        component: FoodHousesComponent
      },
      {
        path: 'my-orders', 
        component: MyOrdersComponent
      },
      {
        path: 'search', 
        component: BuscarComponent
      },
      {
        path: 'profile', 
        component: ProfileComponent,
        canActivate: [AngularFireAuthGuard], 
        data: { authGuardPipe: irALogin},
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'my-data'},
          { path:'my-data', component: MisDatosComponent},
          { path:'my-purchases', component: MisComprasComponent},
          { path:'advanced-data',  component: PerfilAvanzadoComponent}
        ]
      },
      {
        path: 'start-selling', 
        component: StartSellingComponent,
        canActivate: [AngularFireAuthGuard], 
        data: { authGuardPipe: irALogin},
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

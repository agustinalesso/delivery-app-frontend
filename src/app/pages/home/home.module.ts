import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { StartComponent } from '../../components/home/start/start.component';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { ProfileComponent } from '../../components/home/profile/profile.component';
import { FoodHousesComponent } from '../../components/home/food-houses/food-houses.component';
import { MyOrdersComponent } from '../../components/home/my-orders/my-orders.component';
import { StartSellingComponent } from '../../components/home/start-selling/start-selling.component';
import { ProductCardComponent } from '../../components/home/product-card/product-card.component';
import { BuscarComponent } from '../../components/buscar/buscar.component';
import { MisDatosComponent } from '../../components/home/profile/mis-datos/mis-datos.component';
import { MisComprasComponent } from '../../components/home/profile/mis-compras/mis-compras.component';
import { PerfilAvanzadoComponent } from '../../components/home/profile/perfil-avanzado/perfil-avanzado.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    StartComponent,
    NavbarComponent,
    ProfileComponent,
    FoodHousesComponent,
    MyOrdersComponent,
    StartSellingComponent,
    ProductCardComponent,
    BuscarComponent,
    MisDatosComponent,
    MisComprasComponent,
    PerfilAvanzadoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }

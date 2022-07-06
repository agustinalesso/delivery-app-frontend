import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNavBarComponent } from 'src/app/components/admin/admin-nav-bar/admin-nav-bar.component';
import { AdminInicioComponent } from 'src/app/components/admin/admin-inicio/admin-inicio.component';
import { AdminMenuComponent } from '../../components/admin/admin-menu/admin-menu.component';
import { AdminDeliveryComponent } from '../../components/admin/admin-delivery/admin-delivery.component';
import { AdminReportsComponent } from '../../components/admin/admin-reports/admin-reports.component';
import { ContainerComponent } from 'src/app/components/shared/container/container.component';
import { TituloSeccionComponent } from '../../components/shared/titulo-seccion/titulo-seccion.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AdminNavBarComponent,
    AdminInicioComponent,
    AdminMenuComponent,
    AdminDeliveryComponent,
    AdminReportsComponent,
    ContainerComponent,
    TituloSeccionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDeliveryComponent } from 'src/app/components/admin/admin-delivery/admin-delivery.component';
import { AdminInicioComponent } from 'src/app/components/admin/admin-inicio/admin-inicio.component';
import { AdminMenuComponent } from 'src/app/components/admin/admin-menu/admin-menu.component';
import { AdminReportsComponent } from 'src/app/components/admin/admin-reports/admin-reports.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'start',
        component: AdminInicioComponent
      },
      {
        path: 'menu',
        component: AdminMenuComponent
      },
      {
        path: 'delivery',
        component: AdminDeliveryComponent
      },
      {
        path: 'reports',
        component: AdminReportsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

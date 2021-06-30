import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ReserveCreateComponent } from './component/reserve/reserve-create/reserve-create.component';
import { ReserveListComponent } from './component/reserve/reserve-list/reserve-list.component';
import { ReserveQueryComponent } from './component/reserve/reserve-query/reserve-query.component';
import { VehicleTypeCreateComponent } from './component/vehicle-type/vehicle-type-create/vehicle-type-create.component';
import { VehicleTypeEditComponent } from './component/vehicle-type/vehicle-type-edit/vehicle-type-edit.component';
import { VehicleTypeListComponent } from './component/vehicle-type/vehicle-type-list/vehicle-type-list.component';
import { PrincipalComponent } from './principal/principal.component';

const ROUTES: Routes = [
  {
    path: 'main', component: AppComponent
  },
  {
    path: 'principal', component: PrincipalComponent
  },
  {
    path: 'reserve-list', component: ReserveListComponent
  },
  {
    path: 'reserve-create', component: ReserveCreateComponent
  },
  {
    path: 'reserve-query/:id', component: ReserveQueryComponent
  },
  {
    path: 'vehicle-type-list', component: VehicleTypeListComponent
  },
  {
    path: 'vehicle-type-create', component: VehicleTypeCreateComponent
  },
  {
    path: 'vehicle-type-edit/:id', component: VehicleTypeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

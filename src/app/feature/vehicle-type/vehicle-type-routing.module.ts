import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleTypeCreateComponent } from './components/vehicle-type-create/vehicle-type-create.component';
import { VehicleTypeEditComponent } from './components/vehicle-type-edit/vehicle-type-edit.component';
import { VehicleTypeListComponent } from './components/vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeComponent } from './components/vehicle-type/vehicle-type.component';


const routes: Routes = [
  {
    path: '',
    component: VehicleTypeComponent,
    children: [
      {
        path: 'vehicle-type-create',
        component: VehicleTypeCreateComponent
      },
      {
        path: 'vehicle-type-list',
        component: VehicleTypeListComponent
      },
      {
        path: 'vehicle-type-edit/:id',
        component: VehicleTypeEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleTypeRoutingModule { }

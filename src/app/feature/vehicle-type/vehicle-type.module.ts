import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { VehicleTypeService } from './shared/service/vehicle-type.service';
import { VehicleTypeTableService } from './shared/service/vehicle-type-table.service';
import { VehicleTypeComponent } from './components/vehicle-type/vehicle-type.component';
import { VehicleTypeListComponent } from './components/vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeCreateComponent } from './components/vehicle-type-create/vehicle-type-create.component';
import { VehicleTypeEditComponent } from './components/vehicle-type-edit/vehicle-type-edit.component';
import { VehicleTypeRoutingModule } from './vehicle-type-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VehicleTypeEditComponent,
    VehicleTypeCreateComponent,
    VehicleTypeListComponent,
    VehicleTypeComponent
  ],
  imports: [
    VehicleTypeRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  providers: [VehicleTypeService, VehicleTypeTableService]
})
export class VehicleTypeModule { }

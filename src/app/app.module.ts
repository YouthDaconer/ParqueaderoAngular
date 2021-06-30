import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReserveCreateComponent } from './component/reserve/reserve-create/reserve-create.component';
import { ReserveListComponent } from './component/reserve/reserve-list/reserve-list.component';
import { VehicleTypeCreateComponent } from './component/vehicle-type/vehicle-type-create/vehicle-type-create.component';
import { VehicleTypeListComponent } from './component/vehicle-type/vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeEditComponent } from './component/vehicle-type/vehicle-type-edit/vehicle-type-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeaderReserve } from './directives/sortable-reserve.directive';
import { PrincipalComponent } from './principal/principal.component';
import { ReserveQueryComponent } from './component/reserve/reserve-query/reserve-query.component';

@NgModule({
  declarations: [
    AppComponent,
    ReserveCreateComponent,
    ReserveListComponent,
    VehicleTypeCreateComponent,
    VehicleTypeListComponent,
    VehicleTypeEditComponent,
    NgbdSortableHeaderReserve,
    PrincipalComponent,
    ReserveQueryComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';

import { ReserveQueryComponent } from './components/reserve-query/reserve-query.component';
import { ReserveCreateComponent } from './components/reserve-create/reserve-create.component';
import { ReserveListComponent } from './components/reserve-list/reserve-list.component';
import { ReserveService } from './shared/service/reserve.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReserveComponent } from './components/reserve/reserve.component';
import { ReserveTableService } from 'src/app/feature/reserve/shared/service/reserve-table.service';
import { ReserveRoutingModule } from './reserve-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReserveQueryComponent,
    ReserveCreateComponent,
    ReserveListComponent,
    ReserveComponent
  ],
  imports: [
    ReserveRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  providers: [ReserveService, ReserveTableService]
})
export class ReserveModule { }

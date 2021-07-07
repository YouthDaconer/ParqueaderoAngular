import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RestrictionTableService } from './shared/service/restriction-table.service';
import { RestrictionService } from './shared/service/restriction.service';
import { RestrictionComponent } from './components/restriction/restriction.component';
import { RestrictionListComponent } from './components/restriction-list/restriction-list.component';
import { RestrictionCreateComponent } from './components/restriction-create/restriction-create.component';
import { RestrictionRoutingModule } from './restriction-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RestrictionCreateComponent,
    RestrictionListComponent,
    RestrictionComponent,
    RestrictionComponent
  ],
  imports: [
    RestrictionRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  providers: [RestrictionService, RestrictionTableService]
})
export class RestrictionModule { }

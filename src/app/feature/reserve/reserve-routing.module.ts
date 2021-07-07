import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReserveComponent } from './components/reserve/reserve.component';
import { ReserveCreateComponent } from './components/reserve-create/reserve-create.component';
import { ReserveListComponent } from './components/reserve-list/reserve-list.component';
import { ReserveQueryComponent } from './components/reserve-query/reserve-query.component';


const routes: Routes = [
  {
    path: '',
    component: ReserveComponent,
    children: [
      {
        path: 'reserve-create',
        component: ReserveCreateComponent
      },
      {
        path: 'reserve-list',
        component: ReserveListComponent
      },
      {
        path: 'reserve-query/:id',
        component: ReserveQueryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestrictionCreateComponent } from './components/restriction-create/restriction-create.component';
import { RestrictionListComponent } from './components/restriction-list/restriction-list.component';
import { RestrictionComponent } from './components/restriction/restriction.component';


const routes: Routes = [
  {
    path: '',
    component: RestrictionComponent,
    children: [
      {
        path: 'restriction-create',
        component: RestrictionCreateComponent
      },
      {
        path: 'restriction-list',
        component: RestrictionListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestrictionRoutingModule { }

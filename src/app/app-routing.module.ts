import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';

const ROUTES: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'reserve', loadChildren: () => import('./feature/reserve/reserve.module').then(mod => mod.ReserveModule)
  },
  {
    path: 'vehicle-type', loadChildren: () => import('./feature/vehicle-type/vehicle-type.module').then(mod => mod.VehicleTypeModule)
  },
  {
    path: 'restriction', loadChildren: () => import('./feature/restriction/restriction.module').then(mod => mod.RestrictionModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

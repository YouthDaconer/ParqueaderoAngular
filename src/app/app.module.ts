import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { CoreModule } from './core/core.module';
import { ReserveModule } from './feature/reserve/reserve.module';
import { VehicleTypeModule } from './feature/vehicle-type/vehicle-type.module';
import { RestrictionModule } from './feature/restriction/restriction.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    VehicleTypeModule,
    ReserveModule,
    RestrictionModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  exports: [],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

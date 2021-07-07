import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { CreateVehicleTypeCommand } from '../command/CreateVehicleTypeCommand';
import { VehicleType } from '../model/VehicleType';
import { UpdateVehicleTypeCommand } from '../command/UpdateVehicleTypeCommand';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private urlVehicleTypeService: string = environment.urlWebServiceRest + 'VehicleType/';

  constructor(protected http: HttpService) { }

  public GetAll(): Observable<any> {
    return this.http.doGet<VehicleType[]>(this.urlVehicleTypeService);
  }

  public GetById(vehicleTypeId: string): Observable<any> {
    return this.http.doGet<VehicleType>(this.urlVehicleTypeService + vehicleTypeId);
  }

  public CreateVehicleType(jsonParams: CreateVehicleTypeCommand): Observable<any> {
    return this.http.doPost<CreateVehicleTypeCommand, VehicleType>(this.urlVehicleTypeService, jsonParams);
  }

  public UpdateVehicleType(jsonParams: UpdateVehicleTypeCommand): Observable<any> {
    return this.http.doPut<CreateVehicleTypeCommand, boolean>(this.urlVehicleTypeService, jsonParams);
  }

}
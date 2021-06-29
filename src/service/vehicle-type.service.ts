import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/Operators';
import { VehicleType } from 'src/app/domain/VehicleType';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private urlVehicleTypeService: string = environment.urlWebServiceRest + 'VehicleType/';

  constructor(public httpClient: HttpClient) { }

  public GetAll(): Observable<any> {
    return this.httpClient.get(this.urlVehicleTypeService);
  }

  public GetById(vehicleTypeId: string): Observable<any> {
    return this.httpClient.get<any>(this.urlVehicleTypeService + vehicleTypeId).pipe(
      catchError((err, caught) => {
        return throwError(err);
      })
    );
  }

  public CreateVehicleType(vehicleType: VehicleType): Observable<any> {
    return this.httpClient.post(this.urlVehicleTypeService, vehicleType);
  }

  public UpdateVehicleType(vehicleType: VehicleType): Observable<any> {
    return this.httpClient.put(this.urlVehicleTypeService, vehicleType);
  }

}
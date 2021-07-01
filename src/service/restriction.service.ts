import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class RestrictionService {

  private urlRestrictionService: string = environment.urlWebServiceRest + 'Restriction/';

  constructor(public httpClient: HttpClient) { }

  public GetAll(): Observable<any> {
    return this.httpClient.get(this.urlRestrictionService);
  }

  public GetByVehicleType(vehicleTypeId: string): Observable<any> {
    return this.httpClient.get<any>(this.urlRestrictionService + vehicleTypeId).pipe(
      catchError((err, caught) => {
        return throwError(err);
      })
    );
  }

  public GetById(restrictionId: string): Observable<any> {
    return this.httpClient.get<any>(this.urlRestrictionService + restrictionId).pipe(
      catchError((err, caught) => {
        return throwError(err);
      })
    );
  }

  public CreateRestriction(jsonParams: any): Observable<any> {
    return this.httpClient.post(this.urlRestrictionService, jsonParams);
  }

  public UpdateRestriction(jsonParams: any): Observable<any> {
    return this.httpClient.put(this.urlRestrictionService, jsonParams);
  }

  public DeleteRestriction(jsonParams: any): Observable<any> {
    return this.httpClient.post(this.urlRestrictionService + "delete", jsonParams);
  }

}
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  private urlReserveService: string = environment.urlWebServiceRest + 'Reserve/';

  constructor(public httpClient: HttpClient) { }

  public GetAll(): Observable<any> {
    return this.httpClient.get(this.urlReserveService);
  }

  public GetById(reserveId: string): Observable<any> {
    return this.httpClient.get<any>(this.urlReserveService + reserveId).pipe(
      catchError((err, caught) => {
        return throwError(err);
      })
    );
  }

  public CreateReserve(jsonParams: any): Observable<any> {
    return this.httpClient.post(this.urlReserveService, jsonParams);
  }

  public CheckBalanceAsync(jsonParams: any): Observable<any> {
    return this.httpClient.post(this.urlReserveService + "CheckBalance", jsonParams);
  }

  public PayReserve(jsonParams: any): Observable<any> {
    return this.httpClient.put(this.urlReserveService, jsonParams);
  }

}
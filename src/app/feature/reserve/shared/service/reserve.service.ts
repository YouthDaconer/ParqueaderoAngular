import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/Operators';
import { HttpService } from 'src/app/core/services/http.service';
import { Reserve } from '../model/Reserve';
import { CreateReserveCommand } from '../command/CreateReserveCommand';
import { CheckBalanceCommand } from '../command/CheckBalanceCommand';
import { PayReserveCommand } from '../command/PayReserveCommand';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  private urlReserveService: string = environment.urlWebServiceRest + 'Reserve/';

  constructor(protected http: HttpService) { }

  public GetAll(): Observable<any> {
    return this.http.doGet<Reserve[]>(this.urlReserveService);
  }

  public GetById(reserveId: string): Observable<any> {
    return this.http.doGet<Reserve>(this.urlReserveService + reserveId);
  }

  public CreateReserve(jsonParams: CreateReserveCommand): Observable<any> {
    return this.http.doPost<CreateReserveCommand, Reserve>(this.urlReserveService, jsonParams);
  }

  public CheckBalanceAsync(jsonParams: CheckBalanceCommand): Observable<any> {
    return this.http.doPost<CheckBalanceCommand, Reserve>(this.urlReserveService, jsonParams);
  }

  public PayReserve(jsonParams: PayReserveCommand): Observable<any> {
    return this.http.doPut(this.urlReserveService, jsonParams);
  }

}
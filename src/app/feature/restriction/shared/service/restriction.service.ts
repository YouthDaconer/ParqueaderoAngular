import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/Operators';
import { HttpService } from 'src/app/core/services/http.service';
import { Restriction } from '../model/Restriction';
import { CreateRestrictionCommand } from '../command/CreateRestrictionCommand';
import { DeleteRestrictionCommand } from '../command/DeleteRestrictionCommand';

@Injectable({
  providedIn: 'root'
})
export class RestrictionService {

  private urlRestrictionService: string = environment.urlWebServiceRest + 'Restriction/';

  constructor(protected http: HttpService) { }

  public GetAll(): Observable<any> {
    return this.http.doGet<Restriction[]>(this.urlRestrictionService);
  }

  public GetById(restrictionId: string): Observable<any> {
    return this.http.doGet<Restriction>(this.urlRestrictionService + restrictionId);
  }

  public CreateRestriction(jsonParams: CreateRestrictionCommand): Observable<any> {
    return this.http.doPost<CreateRestrictionCommand, Restriction>(this.urlRestrictionService, jsonParams);
  }

  public DeleteRestriction(jsonParams: DeleteRestrictionCommand): Observable<any> {
    return this.http.doPost<DeleteRestrictionCommand, boolean>(this.urlRestrictionService + "delete", jsonParams);
  }

}
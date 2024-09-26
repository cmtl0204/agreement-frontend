import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {MessageDialogService, MessageService} from '@servicesApp/core';
import {AgreementLogModel, AgreementModel, CatalogueModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";

@Injectable({
  providedIn: 'root'
})
export class AgreementLogsHttpService {
  private readonly API_URL = `${environment.API_URL}/agreement-logs`;
  private readonly httpClient = inject(HttpClient);

  findAgreementLogsByAgreement(agreementId: string): Observable<AgreementLogModel[]> {
    const url = `${this.API_URL}/agreements/${agreementId}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }
}

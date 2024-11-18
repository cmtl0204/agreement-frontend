import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageDialogService, MessageService} from '@servicesApp/core';
import {AgreementModel, CatalogueModel, ClosingLogModel, ClosingNotificationModel, PeriodModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";

@Injectable({
  providedIn: 'root'
})
export class ClosingLogsHttpService {
  private readonly API_URL = `${environment.API_URL}/closing-logs`;
  private readonly httpClient = inject(HttpClient);
  private readonly coreService = inject(CoreService);
  private readonly messageService = inject(MessageService);
  private readonly messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  findClosingLogCurrentByAgreement(agreementId: string): Observable<ClosingLogModel> {
    const url = `${this.API_URL}/current`;

    const params = new HttpParams().append('agreementId', agreementId);

    return this.httpClient.get<ServerResponse>(url, {params: params}).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findClosingLogsByAgreement(agreementId: string): Observable<ClosingLogModel[]> {
    const url = `${this.API_URL}`;

    const params = new HttpParams().append('agreementId', agreementId);

    return this.httpClient.get<ServerResponse>(url, {params: params}).pipe(
      map(response => {
        return response.data;
      })
    );
  }
}

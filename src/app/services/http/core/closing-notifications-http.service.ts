import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageDialogService, MessageService} from '@servicesApp/core';
import {AgreementModel, CatalogueModel, ClosingNotificationModel, PeriodModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";
import {formatDate} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class ClosingNotificationsHttpService {
  private readonly API_URL = `${environment.API_URL}/closing-notifications`;
  private readonly httpClient = inject(HttpClient);
  private readonly coreService = inject(CoreService);
  private readonly messageService = inject(MessageService);
  private readonly messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  findClosingNotificationByAgreement(agreementId: string): Observable<ClosingNotificationModel> {
    const url = `${this.API_URL}`;

    const params = new HttpParams().append('agreementId', agreementId);

    return this.httpClient.get<ServerResponse>(url, {params: params}).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  createClosingNotificationByAgreement(payload: ClosingNotificationModel): Observable<ClosingNotificationModel> {
    const url = `${this.API_URL}`;

    this.coreService.isProcessing = true;

    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  createClosingNotificationClosingProcessByAgreement(payload: ClosingNotificationModel): Observable<ClosingNotificationModel> {
    const url = `${this.API_URL}/closing-process`;

    this.coreService.isProcessing = true;

    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  updateClosedAt(id: string, closedAt: Date): Observable<ClosingNotificationModel> {
    const url = `${this.API_URL}/${id}/closed-at`;

    this.coreService.isProcessing = true;

    const params = new HttpParams().append('closedAt', formatDate(closedAt, 'yyyy-MM-dd'));

    return this.httpClient.patch<ServerResponse>(url, null, {params}).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }
}

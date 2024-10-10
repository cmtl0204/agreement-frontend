import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {MessageDialogService, MessageService} from '@servicesApp/core';
import {AdditionalDocumentModel, AgreementModel, CatalogueModel, PeriodModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";

@Injectable({
  providedIn: 'root'
})
export class TrackingLogsHttpService {
  private readonly API_URL = `${environment.API_URL}/tracking-logs`;
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);
  private readonly messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  create(agreementId: string): Observable<PeriodModel> {
    const url = `${this.API_URL}/${agreementId}/periods`;

    return this.httpClient.post<ServerResponse>(url, null).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  createPeriod(agreementId: string): Observable<PeriodModel> {
    const url = `${this.API_URL}/${agreementId}/periods`;

    return this.httpClient.post<ServerResponse>(url, null).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  findPeriodsByAgreement(agreementId: string): Observable<PeriodModel[]> {
    const url = `${this.API_URL}/${agreementId}/periods`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  createTrackingLog(id: string, formData: FormData): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  createAdditionalDocument(id: string, formData: FormData): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/additional-documents`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  changeState(id: string, state: boolean, observation = ''): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/state`;

    const params= new HttpParams()
      .append('state', state)
      .append('observation', observation);

    return this.httpClient.patch<ServerResponse>(url, null,{params}).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  findAdditionalDocumentsByAgreement(agreementId: string): Observable<AdditionalDocumentModel[]> {
    const url = `${this.API_URL}/${agreementId}/additional-documents`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  deleteAdditionalDocument(id: string): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/additional-documents`;

    return this.httpClient.delete<ServerResponse>(url).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }
}

import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {MessageDialogService, MessageService} from '@servicesApp/core';
import {AgreementModel, CatalogueModel, ClosedAgreementModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";

@Injectable({
  providedIn: 'root'
})
export class ClosedAgreementsHttpService {
  private readonly API_URL = `${environment.API_URL}/closed-agreements`;
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);
  private readonly messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  createClose(agreementId: string): Observable<AgreementModel> {
    const url = `${this.API_URL}`;

    const params = new HttpParams().append('agreementId', agreementId);

    return this.httpClient.post<ServerResponse>(url, null, {params}).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  updateClose(agreementId: string): Observable<AgreementModel> {
    const url = `${this.API_URL}`;

    const params = new HttpParams().append('agreementId', agreementId);

    return this.httpClient.patch<ServerResponse>(url, null, {params}).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  findClosedAgreementByAgreement(agreementId: string): Observable<ClosedAgreementModel> {
    const url = `${this.API_URL}`;

    const params = new HttpParams().append('agreementId', agreementId);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  uploadFile(id: string, formData: FormData): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/documents`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }
}

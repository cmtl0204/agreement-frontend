import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageDialogService, MessageService} from '@servicesApp/core';
import {AdditionalDocumentModel, AgreementModel, CatalogueModel, PeriodModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";
import {format} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class TrackingLogsHttpService {
  private readonly API_URL = `${environment.API_URL}/tracking-logs`;
  private readonly httpClient = inject(HttpClient);
  private readonly coreService = inject(CoreService);
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

  createPeriod(agreementId: string, type: string): Observable<PeriodModel> {
    const url = `${this.API_URL}/${type}/${agreementId}/periods`;

    return this.httpClient.post<ServerResponse>(url, null).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  findPeriodsByAgreement(agreementId: string, type: string): Observable<PeriodModel[]> {
    const url = `${this.API_URL}/${type}/${agreementId}/periods`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  validationPeriods(agreementId: string, type: string): Observable<boolean> {
    const url = `${this.API_URL}/${type}/validation-periods`;

    const params = new HttpParams().append('agreementId', agreementId);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  createTrackingLog(periodId: string, formData: FormData, type: string): Observable<AgreementModel> {
    const url = `${this.API_URL}/${type}/${periodId}`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  createExecutionAdditionalDocument(id: string, formData: FormData): Observable<AgreementModel> {
    const url = `${this.API_URL}/execution/${id}/additional-documents`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  changeState(id: string, state: boolean, observation = ''): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/state`;

    const params = new HttpParams()
      .append('state', state)
      .append('observation', observation);

    return this.httpClient.patch<ServerResponse>(url, null, {params}).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  findExecutionAdditionalDocumentsByAgreement(agreementId: string): Observable<AdditionalDocumentModel[]> {
    const url = `${this.API_URL}/execution/${agreementId}/additional-documents`;

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

  downloadLog(periodId: string, type: string) {
    const url = `${this.API_URL}/${type}/${periodId}/download`;

    this.coreService.isProcessing = true;

    this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json'})
      .subscribe(response => {
        const filePath = URL.createObjectURL(new Blob([response]));

        const downloadLink = document.createElement('a');

        downloadLink.href = filePath;

        const fileName = `bitacora_ejecucion_seguimiento_${format(new Date, 'yyyy_MM_dd hh_mm_ss')}.pdf`;

        downloadLink.setAttribute('download', fileName);

        document.body.appendChild(downloadLink);

        downloadLink.click();

        this.coreService.isProcessing = false;
      });
  }
}

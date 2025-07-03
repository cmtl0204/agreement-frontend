import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageDialogService, MessageService} from '@servicesApp/core';
import {AgreementModel, CatalogueModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";
import {format} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class AgreementsHttpService {
  private readonly API_URL = `${environment.API_URL}/agreements`;
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);
  private readonly messageDialogService = inject(MessageDialogService);
  private readonly coreService = inject(CoreService);

  constructor() {
  }

  register(payload: AgreementModel): Observable<AgreementModel> {
    const url = `${this.API_URL}`;

    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  update(id: string, payload: AgreementModel): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  finish(id: string): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/finish`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  uploadEnablingDocuments(id: string, formData: FormData): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/enabling-documents`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  uploadAddendum(id: string, formData: FormData, isEdit = false): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/addendums`;

    const params = new HttpParams().append('edit', isEdit);

    return this.httpClient.post<ServerResponse>(url, formData, {params}).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  uploadEnablingDocument(id: string, formData: FormData, isEdit = false): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/enabling-documents`;

    const params = new HttpParams().append('edit', isEdit);

    return this.httpClient.post<ServerResponse>(url, formData, {params}).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  uploadEnablingDocumentUpdate(id: string, formData: FormData): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/update-enabling-documents`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  findNationalAgreementsByOrigin(): Observable<AgreementModel[]> {
    const url = `${this.API_URL}/national-agreements`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findInternationalAgreementsByOrigin(): Observable<AgreementModel[]> {
    const url = `${this.API_URL}/international-agreements`;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findNationalManagerAgreementsByOrigin(): Observable<AgreementModel[]> {
    const url = `${this.API_URL}/national-manager-agreements`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findInternationalManagerAgreementsByOrigin(): Observable<AgreementModel[]> {
    const url = `${this.API_URL}/international-manager-agreements`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findOne(id: string): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  remove(id: string): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  verifyInternalNumber(internalNumber: string): Observable<AgreementModel> {
    const url = `${this.API_URL}/${internalNumber}/verify-internalnumber`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  verifyInternalNumberUpdate(internalNumber: string, agreementId: string): Observable<AgreementModel> {
    const url = `${this.API_URL}/${internalNumber}/update-verify-internalnumber`;

    const params = new HttpParams().append('agreementId', agreementId);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findReportExecutions(id: string): Observable<AgreementModel[]> {
    const url = `${this.API_URL}/report-execution`;

    const params = new HttpParams().append('id', id);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  createReportExecution(id: string, payload: FormData): Observable<AgreementModel> {
    const url = `${this.API_URL}/report-execution`;

    const params = new HttpParams().append('id', id);

    return this.httpClient.post<ServerResponse>(url, payload, {params}).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  downloadReport(role: string, stateCode: string) {
    const url = `${this.API_URL}/${role}/download-report`;

    const params = new HttpParams().append('stateCode', stateCode);
    this.coreService.isProcessing = true;

    this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json', params})
      .subscribe(response => {
        const filePath = URL.createObjectURL(new Blob([response]));

        const downloadLink = document.createElement('a');

        downloadLink.href = filePath;

        const fileName = `reporte_convenio_${format(new Date, 'yyyy_MM_dd hh_mm_ss')}.xls`;

        downloadLink.setAttribute('download', fileName);

        document.body.appendChild(downloadLink);

        downloadLink.click();

        this.coreService.isProcessing = false;
      });
  }
}

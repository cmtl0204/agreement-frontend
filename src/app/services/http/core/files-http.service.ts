import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MessageService as MessageServicePn} from 'primeng/api';
import {FileModel} from "@models/core";
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageDialogService, MessageService} from '@servicesApp/core';
import {CoreMessageEnum} from "@shared/enums";

@Injectable({
  providedIn: 'root'
})
export class FilesHttpService {
  API_URL = `${environment.API_URL}/files`;
  private messageServicePn = inject(MessageServicePn);
  private coreService = inject(CoreService);
  private httpClient = inject(HttpClient);
  private messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  findByModel(modelId: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/models/${modelId}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findOne(id: string): Observable<FileModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  uploadFile(modelId: string, typeId: string, payload: FormData): Observable<FileModel> {
    const url = `${this.API_URL}/${modelId}/upload?typeId=${typeId}`;

    this.coreService.isProcessing = true;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageServicePn.clear();
        this.messageServicePn.add({
          key: CoreMessageEnum.APP_TOAST,
          severity: 'info',
          summary: response.title,
          detail: response.message
        });
        return response.data;
      })
    );
  }

  uploadImage(modelId: string, payload: FormData): Observable<FileModel> {
    const url = `${this.API_URL}/${modelId}/upload-image`;

    this.coreService.isProcessing = true;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageServicePn.clear();
        this.messageServicePn.add({
          key: CoreMessageEnum.APP_TOAST,
          severity: 'info',
          summary: response.title,
          detail: response.message
        });
        return response.data;
      })
    );
  }

  uploadFiles(modelId: string, formData: FormData): Observable<FileModel> {
    const url = `${this.API_URL}/models/${modelId}`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map((response) => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  remove(id: string, isEdit = false, agreementId = ''): Observable<FileModel> {
    const url = `${this.API_URL}/${id}`;

    this.coreService.isProcessing = true;

    const params = new HttpParams()
      .append('agreementId', agreementId)
      .append('edit', isEdit);

    return this.httpClient.delete<ServerResponse>(url, {params}).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  downloadFile(file: FileModel) {
    const url = `${this.API_URL}/${file.id}/download`;

    this.coreService.isProcessing = true;

    this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json'})
      .subscribe(response => {
        const filePath = URL.createObjectURL(new Blob([response]));

        const downloadLink = document.createElement('a');

        downloadLink.href = filePath;

        downloadLink.setAttribute('download', file.name!);

        document.body.appendChild(downloadLink);

        downloadLink.click();

        this.coreService.isProcessing = false;
      });
  }
}

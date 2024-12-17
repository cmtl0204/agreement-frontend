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
export class ParametersHttpService {
  API_URL = `${environment.API_URL}/parameters`;
  private messageServicePn = inject(MessageServicePn);
  private coreService = inject(CoreService);
  private httpClient = inject(HttpClient);
  private messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  downloadFile(code: string) {
    const url = `${this.API_URL}/downloads`;

    const params = new HttpParams().append('code', code);

    this.coreService.isProcessing = true;

    this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json', params})
      .subscribe(response => {
        const filePath = URL.createObjectURL(new Blob([response]));

        const downloadLink = document.createElement('a');

        downloadLink.href = filePath;

        downloadLink.setAttribute('download', this.getFileName(code));

        document.body.appendChild(downloadLink);

        downloadLink.click();

        this.coreService.isProcessing = false;
      });
  }

  getFileName(code: string) {
    switch (code) {
      case 'format_001':
        return 'formato_informe_avance_semestral_vigente_periodo.doc';
      case 'format_002':
        return 'formato_informe_semestral_proceso_de_cierre_periodo.doc';
    }

    return 'error.pdf';
  }
}

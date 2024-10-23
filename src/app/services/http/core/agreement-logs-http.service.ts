import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageDialogService, MessageService} from '@servicesApp/core';
import {AgreementLogDetailModel, AgreementLogModel, AgreementModel, CatalogueModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";
import {format} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class AgreementLogsHttpService {
  private readonly API_URL = `${environment.API_URL}/agreement-logs`;
  private readonly coreService = inject(CoreService);
  private readonly httpClient = inject(HttpClient);

  findAgreementLogsByAgreement(agreementId: string): Observable<AgreementLogDetailModel[]> {
    const url = `${this.API_URL}/agreements/${agreementId}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  downloadLogsByAgreement(agreementId: string) {
    const url = `${this.API_URL}/${agreementId}/download`;

    this.coreService.isProcessing = true;

    this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json'})
      .subscribe(response => {
        const filePath = URL.createObjectURL(new Blob([response]));

        const downloadLink = document.createElement('a');

        downloadLink.href = filePath;

        const fileName=`bitacora_${format(new Date,'yyyy_MM_dd hh_mm_ss')}.pdf`;

        downloadLink.setAttribute('download', fileName);

        document.body.appendChild(downloadLink);

        downloadLink.click();

        this.coreService.isProcessing = false;
      });
  }
}

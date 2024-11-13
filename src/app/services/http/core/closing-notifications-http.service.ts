import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {MessageDialogService, MessageService} from '@servicesApp/core';
import {AgreementModel, CatalogueModel, ClosingNotificationModel, PeriodModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";

@Injectable({
  providedIn: 'root'
})
export class ClosingNotificationsHttpService {
  private readonly API_URL = `${environment.API_URL}/closing-notifications`;
  private readonly httpClient = inject(HttpClient);
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

}

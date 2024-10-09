import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {MessageDialogService, MessageService} from '@servicesApp/core';
import {AgreementModel, CatalogueModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";

@Injectable({
  providedIn: 'root'
})
export class AdministratorsHttpService {
  private readonly API_URL = `${environment.API_URL}/administrators`;
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);
  private readonly messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  findAgreementsByAdministrator(id: string): Observable<AgreementModel[]> {
    const url = `${this.API_URL}/${id}/agreements`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }
}

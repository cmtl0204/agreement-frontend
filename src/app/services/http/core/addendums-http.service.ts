import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {MessageDialogService, MessageService} from '@servicesApp/core';

@Injectable({
  providedIn: 'root'
})
export class AddendumsHttpService {
  private readonly API_URL = `${environment.API_URL}/addendums`;
  private readonly httpClient = inject(HttpClient);
  private readonly messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  remove(id: string, isEdit = false, agreementId = ''): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;

    const params = new HttpParams()
      .append('agreementId', agreementId)
      .append('edit', isEdit);

    return this.httpClient.delete<ServerResponse>(url, {params}).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);

        return response.data;
      })
    );
  }
}

import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  remove(id: string): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.delete<ServerResponse>(url).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);

        return response.data;
      })
    );
  }
}

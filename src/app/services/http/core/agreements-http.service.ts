import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {MessageService} from '@servicesApp/core';
import {AgreementModel, CatalogueModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";

@Injectable({
  providedIn: 'root'
})
export class AgreementsHttpService {
  private readonly API_URL = `${environment.API_URL}/agreements`;
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  constructor() {
  }

  create(payload: CatalogueModel): Observable<CatalogueModel> {
    const url = `${this.API_URL}`;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  findAll(): Observable<CatalogueModel[]> {
    // const url = this.API_URL;
    const url = './temp/catalogues.json';

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        console.log(response);
        // sessionStorage.setItem('catalogues', JSON.stringify(response.data));
        sessionStorage.setItem('catalogues', JSON.stringify(response));
        return response.data;
      })
    );
  }
  findAllAgreements(): Observable<AgreementModel[]> {
    const url = this.API_URL;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        console.log(response);
        // sessionStorage.setItem('catalogues', JSON.stringify(response.data));
        // sessionStorage.setItem('catalogues', JSON.stringify(response));
        return response.data;
      })
    );
  }

  findOne(id: string): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => response.data)
    );
  }

  update(id: string, payload: CatalogueModel): Observable<CatalogueModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageService.success(response);
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

  removeAll(id: CatalogueModel[]): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  findCache(): Observable<boolean> {
    const url = `${this.API_URL}/cache/get`;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        sessionStorage.setItem('catalogues', JSON.stringify(response.data));
        return true;
      })
    );
  }

  findByType(type: CatalogueTypeEnum): CatalogueModel[] {
    const catalogues: CatalogueModel[] = JSON.parse(String(sessionStorage.getItem('catalogues')));

    if (catalogues) {
      return catalogues.filter(catalogue => catalogue.type === type);
    }

    return [];
  }
}

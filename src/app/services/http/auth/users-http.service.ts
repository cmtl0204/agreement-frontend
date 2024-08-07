import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {MessageService} from '@servicesApp/core';
import {AgreementModel, CatalogueModel} from '@models/core';
import {CatalogueTypeEnum} from "@shared/enums";
import {UserModel} from "@models/auth";

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  private readonly API_URL = `${environment.API_URL}/users`;
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  constructor() {
  }

  register(payload: AgreementModel): Observable<AgreementModel> {
    const url = `${this.API_URL}`;

    return this.httpClient.post<AgreementModel>(url, payload).pipe(
      map(response => {
        // this.messageService.success(response);
        return response;
      })
    );
  }

  findAllUsersLDAP(): Observable<UserModel[]> {
    const url = `${this.API_URL}/ldap`;

    return this.httpClient.get<UserModel[]>(url).pipe(
      map(response => {
        return response;
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

  findNationalAgreementsByOrigin(): Observable<AgreementModel[]> {
    const url = `${this.API_URL}/national-agreements`;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findOne(id: string): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get(url).pipe(
      map(response => {
        console.log(response)
        return response
      })
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
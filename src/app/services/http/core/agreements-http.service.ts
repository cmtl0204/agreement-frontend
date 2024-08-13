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

  register(payload: AgreementModel): Observable<AgreementModel> {
    const url = `${this.API_URL}`;

    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  uploadEnablingDocuments(id:string,formData: FormData): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/enabling-documents`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  uploadAddendum(id:string,formData: FormData): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}/addendums`;

    return this.httpClient.post<ServerResponse>(url, formData).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  findAll(): Observable<CatalogueModel[]> {
    const url = this.API_URL;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findAllAgreements(): Observable<AgreementModel[]> {
    const url = this.API_URL;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        console.log(response);
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

  findOne(id: string): Observable<AgreementModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
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
}

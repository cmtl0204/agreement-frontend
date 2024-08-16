import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CreateMenuDto, MenuModel, UpdateMenuDto} from '@models/auth';
import {PaginatorModel} from "@models/core";
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@servicesApp/core';

@Injectable({
  providedIn: 'root'
})
export class MenusHttpService {
  API_URL = `${environment.API_URL}/menus`;

  constructor(
    private coreService: CoreService,
    private httpClient: HttpClient,
    private messageService: MessageService,
  ) {
  }

  create(payload: CreateMenuDto): Observable<MenuModel> {
    const url = `${this.API_URL}`;


    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {

        this.messageService.success(response);
        return response.data;
      })
    );
  }

  catalogue(): Observable<MenuModel[]> {
    const url = `${this.API_URL}/catalogue`;


    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {

        return response.data;
      })
    );
  }

  getMenusForSidebar(): Observable<MenuModel[]> {
    const url = `${this.API_URL}/sidebar`;


    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {

        return response.data;
      })
    );
  }

  getMenusByRole(roleId:string): Observable<MenuModel[]> {
    const url = `${this.API_URL}/roles/${roleId}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  findAll(page: number = 0, search: string = ''): Observable<MenuModel[]> {
    const url = this.API_URL;

    const headers = new HttpHeaders().append('pagination', 'true');
    const params = new HttpParams()
      .append('page', page)
      .append('search', search);


    return this.httpClient.get<ServerResponse>(url, {headers, params}).pipe(
      map((response) => {

        // if (response.pagination) {
        //   this.pagination.next(response.pagination);
        // }
        return response.data;
      })
    );
  }

  findOne(id: string): Observable<MenuModel> {
    const url = `${this.API_URL}/${id}`;


    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {

        return response.data;
      })
    );
  }

  update(id: string, payload: UpdateMenuDto): Observable<MenuModel> {
    const url = `${this.API_URL}/${id}`;


    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {

        this.messageService.success(response);
        return response.data;
      })
    );
  }

  remove(id: string): Observable<MenuModel> {
    const url = `${this.API_URL}/${id}`;


    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {

        this.messageService.success(response);
        return response.data;
      })
    );
  }

  removeAll(menus: MenuModel[]): Observable<MenuModel[]> {
    const url = `${this.API_URL}/remove-all`;


    return this.httpClient.patch<ServerResponse>(url, menus).pipe(
      map((response) => {

        this.messageService.success(response);
        return response.data;
      })
    );
  }
}

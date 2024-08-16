import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoreService} from "@servicesApp/core";
import {tap} from "rxjs/operators";

@Injectable()
export class CoreInterceptor implements HttpInterceptor {

  constructor(private coreService: CoreService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let flag: boolean | undefined = false;
    let headers = request.headers ? request.headers : new HttpHeaders();
    let params = request.params ? request.params : new HttpParams();

    if (headers.get('pagination')) {
      if (!params.get('page')) {
        params = params.append('page', this.coreService.paginator.page);
      }

      if (!params.get('limit')) {
        params = params.append('limit', this.coreService.paginator.limit);
      }
    }

    // flag = request.headers.getAll('Content-Type')?.some(header => header === 'multipart/form-data');

    // headers = headers.append('Accept', 'application/json')

    // if (!flag) {
    //   headers = headers.append('Content-Type', 'application/json');
    // } else {
    //   headers.set('Content-Type','s');
    // }

    this.coreService.isLoading = true;

    return next.handle(request.clone({headers, params})).pipe(
      tap(value => {
        this.coreService.isLoading = false;
      })
    );
  }
}

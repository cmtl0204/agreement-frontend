import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '@servicesApp/auth';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = request.headers ? request.headers : new HttpHeaders();

    if (this.authService.token) {
      headers = headers
        .append(
          'Authorization',
          `Bearer ${this.authService.token.replace(/"/g, '')}`);
    }

    return next.handle(request.clone({headers}));
  }
}

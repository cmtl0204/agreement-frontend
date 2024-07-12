import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,} from '@angular/common/http';
import {delay, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CoreService, MessageService} from '@servicesApp/core';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
  constructor(private coreService: CoreService, private messageService: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      delay(200),//review quitar solo es para que se pueda ver el efecto
      catchError(error => {
        this.coreService.isLoading = false;
        this.coreService.isProcessing = false;
        this.messageService.error(error.error);
        return throwError(error);
      }));
  }
}

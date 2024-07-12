import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {CoreService, MessageService} from "@servicesApp/core";
import {ServerResponse} from "@models/http-response";

@Injectable()

export class VersionInterceptor implements HttpInterceptor {

  constructor(private readonly coreService: CoreService,
              private readonly messageService: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request.clone()).pipe(
      tap((httpEvent) => {
          if (httpEvent.type === 0) {
            return;
          }

          if (httpEvent instanceof HttpResponse) {
            const version = (httpEvent.body as ServerResponse).version;

            if (version) {
              this.coreService.newVersion = version;

              if (!this.coreService.version) {
                this.coreService.updateSystem();
              } else if (version != this.coreService.version) {
                if (version != this.coreService.version) {
                  // this.messageService.questionVersion(version)
                  //   .then(result => {
                  //     if (result.isConfirmed) {
                  //       this.coreService.updateSystem();
                  //     }
                  //   });
                }
              }
            }
          }
        }
      ));
  }
}

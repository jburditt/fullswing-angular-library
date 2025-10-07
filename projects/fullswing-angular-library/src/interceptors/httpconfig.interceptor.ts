import { Injectable, Provider } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { LoggingFactory } from '../services/logging/logging.factory';
import { LoggingService } from '../services/logging/logging-service.interface';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  private readonly _loggingService: LoggingService;

  constructor(
    private loggingFactory: LoggingFactory
  ) {
    this._loggingService = this.loggingFactory.create(this.constructor.name);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(2),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._loggingService.info("HttpEvent", event)
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this._loggingService.error("HttpEvent Error", error)
        throw error;
      })
    );
  }
}

export function provideHttpInterceptor(): Provider {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }
}


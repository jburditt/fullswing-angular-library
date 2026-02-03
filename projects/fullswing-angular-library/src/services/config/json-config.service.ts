import { Injectable, Provider } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { ConfigService } from './config-service.interface';
import { Configuration } from './config.interface';

@Injectable({
  providedIn: 'root',
})
export class JsonConfigService implements ConfigService {
  config!: Configuration;
  isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) { }

  public loadConfig$(): Observable<boolean> {
    return this.http.get('config.json')
      .pipe(map((data: any) => {
        this.config = data;
        this.isLoaded$.next(true);
        return true;
      }), catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }));
  }
}

export function provideConfigService(): Provider {
  return {
    provide: ConfigService,
    useClass: JsonConfigService,
  };
}

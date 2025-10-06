import { Injectable, Provider } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ConfigService } from './config-service.interface';
import { Configuration } from './config.interface';

/* TODO prove that this is superflous by adding a test that provides a ConfigService with a static value and then delete fake-config.service.ts*/

@Injectable({
  providedIn: 'root',
})
export class FakeConfigService implements ConfigService {
  config: Configuration = {
    "baseUrl": "https://localhost:4200/api",
    "logLevel": "All"
  } as Configuration;
  isLoaded$!: BehaviorSubject<boolean>;

  loadConfig$(): Observable<boolean> {
    return of();
  }
}

export function provideFakeConfigService(): Provider {
  return {
    provide: ConfigService,
    useClass: FakeConfigService,
  };
}

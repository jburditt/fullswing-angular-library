import { Injectable } from "@angular/core";
import { LogLevel, LoggingService } from "./logging-service.interface";
import { ConfigService } from '../config/config-service.interface';
import { filter, take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable()
export class LoggingFactory {

  constructor(
    private readonly configService: ConfigService,
    private loggingService: LoggingService
  ) { }

  public create(scope: string): LoggingService {
    // some services are initialized before configService is loaded, set logLevel after configService is loaded
    // NOTE this could lead to some extra logs on all levels on application startup
    if (!this.configService.config?.logLevel) {
      this.configService.isLoaded$
       .pipe(
          filter((isLoaded: boolean) => isLoaded),
          take(1),
          takeUntilDestroyed()
        ).subscribe(() => this.loggingService.logLevel = (<any>LogLevel)[this.configService.config.logLevel]);
    } else {
      this.loggingService.logLevel = (<any>LogLevel)[this.configService.config.logLevel];
    }
    this.loggingService.scope = scope;
    return this.loggingService;
  }
}

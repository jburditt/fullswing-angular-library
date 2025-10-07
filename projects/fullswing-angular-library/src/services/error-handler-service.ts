import { ErrorHandler, Injectable, Provider } from '@angular/core';
import { LoggingFactory } from './logging/logging.factory';
import { LoggingService } from './logging/logging-service.interface';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

  private readonly _loggingService: LoggingService;

  constructor(
    private loggingFactory: LoggingFactory
  ) {
    super();

    this._loggingService = this.loggingFactory.create(this.constructor.name);
  }

  override handleError(error: any) {
    this._loggingService.error("ErrorHandler", error);
  }
}

export function provideErrorHandler(): Provider {
  return { provide: ErrorHandler, useClass: ErrorHandlerService };
}

import { Component, input } from '@angular/core';
import { LoggingFactory } from '../../services/logging/logging.factory';
import { LoggingService } from '../../services/logging/logging-service.interface';
import { AbstractControl } from '@angular/forms';

@Component({
    templateUrl: 'validation-message.component.html',
    imports: [],
    selector: 'fs-validation-message'
})
export class ValidationMessageComponent {
  control = input.required<AbstractControl>();
  label = input.required<string>();

  private readonly _loggingService: LoggingService;

  constructor(private loggingFactory: LoggingFactory) {
    this._loggingService = this.loggingFactory.create(this.constructor.name);
  }

  protected ngOnInit() {
    this._loggingService.debug('ValidationMessageComponent initialized');
  }
}

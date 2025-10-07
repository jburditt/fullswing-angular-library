import { Injectable, Provider } from '@angular/core';
import { HotToastService as NgNeatHotToastService, provideHotToastConfig } from '@ngxpert/hot-toast';
import { ToastService } from './toast-service.interface';

@Injectable()
export class HotToastService implements ToastService {

    constructor(private hotToastService: NgNeatHotToastService) {}

    info(message: string) {
        this.hotToastService.info(message);
    }

    error(message: string) {
        this.hotToastService.error(message);
    }

    warning(message: string) {
        this.hotToastService.warning(message);
    }

    show(message: string) {
        this.hotToastService.show(message);
    }

    success(message: string) {
        this.hotToastService.success(message);
    }
}

export function provideToastService(): Provider {
  return [
    provideHotToastConfig({
      position: 'top-center',
      dismissible: true
    }),
    {
      provide: ToastService,
      useClass: HotToastService
    }
  ];
};

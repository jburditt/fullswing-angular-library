import { Injectable, Provider } from '@angular/core';
import { HotToastService as NgNeatHotToastService, provideHotToastConfig } from '@ngxpert/hot-toast';
import { ToastService } from './toast-service.interface';

@Injectable()
export class HotToastService implements ToastService {

    constructor(private hotToastService: NgNeatHotToastService) {}

    public info(message: string) {
        this.hotToastService.info(message);
    }

    public error(message: string) {
        this.hotToastService.error(message);
    }

    public warning(message: string) {
        this.hotToastService.warning(message);
    }

    public show(message: string) {
        this.hotToastService.show(message);
    }

    public success(message: string) {
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

import { Directive, ElementRef, input, OnInit } from '@angular/core';
import { ConfigService } from '../services/config/config-service.interface';

@Directive({
  selector: '[featureEnabled]',
  standalone: true
})
export class FeatureEnabledDirective implements OnInit {
  featureEnabled = input.required<string>();
  featureEnabledIf = input<boolean>(true);

  constructor(private el: ElementRef, private configService: ConfigService) { }

  ngOnInit() {
    if (this.configService.config.featureFlags[this.featureEnabled()] !== this.featureEnabledIf()) {
      this.el.nativeElement.parentNode.removeChild(this.el.nativeElement);
    }
  }
}

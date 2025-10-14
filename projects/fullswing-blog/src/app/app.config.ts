import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideMarkdown } from 'ngx-markdown';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { DISQUS_SHORTNAME } from 'ngx-disqus';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideMarkdown({ loader: HttpClient }),
    {
      provide: DISQUS_SHORTNAME,
      useValue: 'fullswing'
    },
  ]
};

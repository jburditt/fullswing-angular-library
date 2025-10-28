import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MARKED_OPTIONS, MarkedOptions, MarkedRenderer, provideMarkdown } from 'ngx-markdown';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
//import { DISQUS_SHORTNAME } from 'ngx-disqus';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideMarkdown({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory
      },
    }),
    // {
    //   provide: DISQUS_SHORTNAME,
    //   useValue: 'fullswing'
    // },
  ]
};

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.code = ({ text, lang, escaped }) => {
      const args = lang?.split(" ");
      console.log("args", args);
      let attributes = "";
      let lineNumbers = false;

      if (args) {
      for (let arg of args) {
        console.log("arg", arg);
        if (arg.indexOf("=") > 0) {
          const equation = arg.split("=");
          if (equation[0] == "line") {
            attributes += ' data-line=' + equation[1];
            console.log("line", attributes);
            lineNumbers = true;
          } else if (equation[0] == "lineOffset") {
            lineNumbers = true;
          }
        } else if (arg == "lineNumbers") {
          lineNumbers = true;
        }
      }
      }

      let langString = (lang || '').match(/^\S*/)?.[0];
      if (langString)
        langString = ' class="language-' + escape(langString) + '"'
      else
        langString = '';

      const code = text.replace(/\n$/, '') + '\n';

      return '<pre data-line="2" data-line-offset="3"' + (lineNumbers ? ' class="line-numbers"' : '') + '><code' + langString + '>'
        + code
        + '</code></pre>\n';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: true,
    pedantic: false,
  };
}

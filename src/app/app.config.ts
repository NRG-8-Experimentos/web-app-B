import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './iam/services/auth-interceptor';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {firstValueFrom} from 'rxjs';


export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return {
    getTranslation: (lang: string) => http.get(`/assets/i18n/${lang}.json`)
  } as TranslateLoader;
}

export function appInitializerFactory(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('en');
    return firstValueFrom(translate.use('en'));
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }
      })
    ),
    { provide: APP_INITIALIZER, useFactory: appInitializerFactory, deps: [TranslateService], multi: true }
  ]
};

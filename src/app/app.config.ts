import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { publicEndpointInterceptor } from './core/interceptors/public-endpoint.interceptor';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';
import { Runner } from './socket/runner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideHttpClient(
      withInterceptors([
        tokenInterceptor,
        publicEndpointInterceptor,
        cacheInterceptor,
      ])
    ),
    {
      provide: Runner,
      useValue: Runner.getInstance(),
    },
  ],
};

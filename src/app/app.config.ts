import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { publicEndpointInterceptor } from './core/interceptors/public-endpoint.interceptor';
import { Runner } from './socket/runner';
import { OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { storageFactory } from './core/auth/client-auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideHttpClient(
      withInterceptors([tokenInterceptor, publicEndpointInterceptor])
    ),
    {
      provide: Runner,
      useValue: Runner.getInstance(),
    },
    provideOAuthClient({
      resourceServer: {
        allowedUrls: [],
        sendAccessToken: true,
      },
    }),
    {
      provide: OAuthStorage,
      useFactory: storageFactory,
    },
  ],
};

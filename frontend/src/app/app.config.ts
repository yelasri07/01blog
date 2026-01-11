import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptor/http-interceptor';
import { AuthStateService } from './core/services/auth.state.service';
import { firstValueFrom } from 'rxjs';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideAppInitializer(() => {
      const authStateService = inject(AuthStateService)
      return firstValueFrom(
        authStateService.loadCurrentUser()
      )
    }),
    provideMarkdown()
  ]
};

import { ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptor/http-interceptor';
import { AuthStateService } from './core/services/auth.state.service';
import { firstValueFrom } from 'rxjs';
import { provideMarkdown } from 'ngx-markdown';
import { CustomErrorHandlerService } from './core/services/custom-error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    provideMarkdown(),
    { provide: ErrorHandler, useClass: CustomErrorHandlerService },
    MatSnackBar
  ]
};

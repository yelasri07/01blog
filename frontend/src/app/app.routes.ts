import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loginRegisterGuard } from './core/guards/login-register-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [authGuard],
        loadComponent: () => import('./features/home/home').then(m => m.Home)
    },
    {
        path: 'auth',
        canActivate: [loginRegisterGuard],
        loadComponent: () => import('./features/auth/auth').then(m => m.Auth),
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    }
];

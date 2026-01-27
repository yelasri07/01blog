import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loginRegisterGuard } from './core/guards/login-register-guard';

export const routes: Routes = [
    {
        path: '',
        canActivateChild: [authGuard],
        loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
        loadChildren: () => import('./layouts/layout.routes').then(m => m.layoutRoutes),
    },
    {
        path: 'auth',
        canActivateChild: [loginRegisterGuard],
        loadComponent: () => import('./features/auth/auth').then(m => m.Auth),
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    }
];

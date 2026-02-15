import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loginRegisterGuard } from './core/guards/login-register-guard';
import { adminGuard } from './core/guards/admin-guard';

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
    },
    {
        path: 'dashboard',
        canActivateChild: [adminGuard],
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
        loadChildren: () => import("./features/dashboard/dashboard.routes").then(m => m.dashboardRoutes)
    },
];

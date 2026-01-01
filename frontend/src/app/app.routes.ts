import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [authGuard],
        loadComponent: () => import('./features/home/home').then(m => m.Home)
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    }
];

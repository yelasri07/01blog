import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/home/pages/home/home').then(c => c.Home)
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(r => r.authRoutes)
    }
];

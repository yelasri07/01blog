import { Routes } from '@angular/router';
import path from 'path';
import { Register } from './features/auth/pages/register/register';
import { Login } from './features/auth/pages/login/login';
import { Home } from './features/home/pages/home/home';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: Home
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'login',
        component: Login
    }
];

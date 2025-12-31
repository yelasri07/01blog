import { Routes } from "@angular/router";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";

export const authRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    }
]
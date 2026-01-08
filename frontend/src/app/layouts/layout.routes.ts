import { Routes } from "@angular/router";
import { Home } from "../features/home/home";

export const layoutRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../features/home/home').then(m => m.Home)
    }
]
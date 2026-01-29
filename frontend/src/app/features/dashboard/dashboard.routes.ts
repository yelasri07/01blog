import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import("./pages/dashboard-home/dashboard-home").then(m => m.DashboardHome)
    },
    {
        path: "users",
        loadComponent: () => import("./pages/users/users").then(m => m.Users)
    }
]
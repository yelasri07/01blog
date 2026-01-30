import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import("./pages/dashboard-home/dashboard-home").then(m => m.DashboardHome)
    },
    {
        path: "users",
        loadComponent: () => import("./pages/dashboard-users/dashboard-users").then(m => m.Users)
    },
    {
        path: "blogs",
        loadComponent: () => import("./pages/dashboard-blogs/dashboard-blogs").then(m => m.DashboardBlogs)
    }
]
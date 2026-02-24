import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
    },
    {
        path: "users",
        loadComponent: () => import("./pages/dashboard-users/dashboard-users").then(m => m.Users)
    },
    {
        path: "blogs",
        loadComponent: () => import("./pages/dashboard-blogs/dashboard-blogs").then(m => m.DashboardBlogs)
    },
    {
        path: "reports",
        loadComponent: () => import("./pages/dashboard-reports/dashboard-reports").then(m => m.DashboardReports)
    }
]
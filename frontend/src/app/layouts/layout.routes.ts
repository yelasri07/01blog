import { Routes } from "@angular/router";

export const layoutRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../features/home/home').then(m => m.Home)
    },
    {
        path: 'profile',
        loadComponent: () => import('../features/profile/profile').then(m => m.Profile)
    },
    {
        path: 'newBlog',
        loadComponent: () => import('../features/blogs/new-blog/new-blog').then(m => m.NewBlog)
    },
]
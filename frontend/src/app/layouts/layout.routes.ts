import { Routes } from "@angular/router";

export const layoutRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../features/home/home').then(m => m.Home)
    },
    {
        path: "blogs/:id",
        loadComponent: () => import('../features/blogs/pages/blog/blog').then(m => m.Blog)
    },
    {
        path: 'new-blog',
        loadComponent: () => import('../features/blogs/pages/new-blog/new-blog').then(m => m.NewBlog)
    },
    {
        path: 'create-blog',
        loadComponent: () => import('../features/blogs/pages/create-blog/create-blog').then(m => m.CreateBlog)
    },
]
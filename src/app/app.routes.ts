import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'create-business',
    loadComponent: () => import('./pages/create-business/create-business.page').then( m => m.CreateBusinessPage)
  },
  {
    path: 'create-deal',
    loadComponent: () => import('./pages/create-deal/create-deal.page').then( m => m.CreateDealPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'dasboard-map',
    loadComponent: () => import('./pages/dasboard-map/dasboard-map.page').then( m => m.DasboardMapPage)
  },
];

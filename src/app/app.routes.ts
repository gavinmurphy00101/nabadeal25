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
  {
    path: 'my-deals',
    loadComponent: () => import('./pages/my-deals/my-deals.page').then( m => m.MyDealsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'current-deal',
    loadComponent: () => import('./pages/current-deal/current-deal.page').then( m => m.CurrentDealPage)
  },
  {
    path: 'customer-facing-business-profile',
    loadComponent: () => import('./pages/customer-facing-business-profile/customer-facing-business-profile.page').then( m => m.CustomerFacingBusinessProfilePage)
  },
  {
    path: 'add-location-marker-details',
    loadComponent: () => import('./pages/add-location-marker-details/add-location-marker-details.page').then( m => m.AddLocationMarkerDetailsPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment/payment.page').then( m => m.PaymentPage)
  },
];

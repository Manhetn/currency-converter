import { Routes } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/currency-converter/pages/home/home.component').then(
        ({ HomeComponent }) => HomeComponent
      ),
  },
  {
    path: '**',
    component: Error404Component,
  },
];

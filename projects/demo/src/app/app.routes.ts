import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'showcase',
  },
  {
    path: 'showcase',
    loadComponent: () =>
      import('./pages/showcase/showcase').then((m) => m.ShowcasePage),
  },
];

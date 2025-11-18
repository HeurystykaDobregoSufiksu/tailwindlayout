import { Routes } from '@angular/router';
import { ComponentShowcaseComponent } from './components/component-showcase/component-showcase.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'showcase',
    pathMatch: 'full'
  },
  {
    path: 'showcase',
    component: ComponentShowcaseComponent,
    title: 'Component Showcase'
  }
];

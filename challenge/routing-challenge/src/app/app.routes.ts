import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { deactivateGuard } from './deactivate.guard';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'product/:id', component: ProductComponent },
  { path: 'form', component: FormComponent, canDeactivate: [deactivateGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

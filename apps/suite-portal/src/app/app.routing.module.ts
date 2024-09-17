import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { AdminAuthGuard } from './route-guards/admin-auth.guard';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    redirectTo: 'admin/home',
    pathMatch: 'full'
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [
    HomeModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: true,
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}

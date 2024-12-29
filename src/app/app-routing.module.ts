import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AdminGuard } from './pages/guards/admin.guard';
import { UserGuard } from './pages/guards/user.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { AnonymousGuard } from './pages/guards/anonymous.guard';
import { NavbarComponent } from './shared/navbar/navbar.component';

const routes: Routes = [
  {
    path:'auth',
    canActivate:[AnonymousGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'user',
    canActivate:[UserGuard],
    component:NavbarComponent,
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },
  {
    path:'admin',
    canActivate:[AdminGuard],
    component:NavbarComponent,
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'',
    component:LandingPageComponent
  },
  {
    path:'unauthorized',
    component:UnauthorizedComponent
  },
  {
    path:'**',
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

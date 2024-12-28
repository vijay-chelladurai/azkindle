import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../../shared/pagenotfound/pagenotfound.component';
import { MyordersComponent } from './myorders/myorders.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  {
    path:'my-orders',
    component:MyordersComponent
  },
  {
    path:'dashboard',
    canActivate:[UserGuard],
    component:UserDashboardComponent,

  },
  {
    path:'**',
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

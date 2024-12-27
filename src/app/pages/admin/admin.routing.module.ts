import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../../shared/pagenotfound/pagenotfound.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:AdminDashboardComponent
  },
  {
    path:'books',
    component:BookListComponent
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
export class AdminRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MyordersComponent } from './myorders/myorders.component';
import { UserRoutingModule } from './user.routing.module';



@NgModule({
  declarations: [
    UserDashboardComponent,
    MyordersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

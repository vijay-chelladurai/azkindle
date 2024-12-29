import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MyordersComponent } from './myorders/myorders.component';
import { UserRoutingModule } from './user.routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UserDashboardComponent,
    MyordersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule
  ]
})
export class UserModule { }

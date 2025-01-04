import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  ordersList:any;

  constructor(private http:HttpClient){
    
  }
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.http
    .get('http://localhost:7161/api/Admin/get-orders')
    .subscribe((res: any) => {
      this.ordersList= res.content;
    });
  }
  cancelOrder(orderId:any){
    this.http
    .post('http://localhost:7161/api/user/delete-orders?bookId='+orderId,{})
    .subscribe((res: any) => {
      this.getOrders();
    });
  }
}

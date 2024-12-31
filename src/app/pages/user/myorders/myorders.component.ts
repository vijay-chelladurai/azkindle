import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})
export class MyordersComponent  implements OnInit {
  constructor(private http: HttpClient) {}


  ordersList:any;

  ngOnInit(): void {
   this.getOrders();
  }

  returnBook(bookId:any){
    this.http
    .post('http://localhost:7161/api/User/delete-orders?orderId='+bookId,{})
    .subscribe((res: any) => {
      this.getOrders();
    });
  }

  getOrders(){
    this.http
    .get('http://localhost:7161/api/User/get-orders')
    .subscribe((res: any) => {
      this.ordersList= res.content;
    });
  }
}

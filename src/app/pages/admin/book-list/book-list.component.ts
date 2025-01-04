import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  bookList:any;
  constructor(private http:HttpClient,private modalService:NgbModal,private auth:AuthService){

  }
  ngOnInit(): void {
    this.getBooks();
    this.auth.getBooks$.subscribe((res:any)=>{
      this.getBooks();
    })
  }

  getBooks() {
    this.http
      .get('http://localhost:7161/api/User/get-books')
      .subscribe((res: any) => {
        this.bookList = res.content;
      });
  }
  deleteBook(bookId:any){
    this.http
    .delete('http://localhost:7161/api/Admin/delete-book?bookId='+bookId)
    .subscribe((res: any) => {
      this.getBooks();
    });
  }
  openLg(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'lg' });
	}
  closePopup(){
    this.getBooks();
    this.modalService.dismissAll();

  }

  


}

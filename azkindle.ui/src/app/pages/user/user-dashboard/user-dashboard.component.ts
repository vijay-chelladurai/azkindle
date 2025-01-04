import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  constructor(private http: HttpClient) {}

  searchQuery: string = '';
  bookList: any;
  filteredBooks: any;

  searchSubject$: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.getBooks();
    this.onLoadSubject();
  }

  orderBook(bookId: any) {
    this.http
      .post('http://localhost:7161/api/User/save-orders?bookId=' + bookId, {})
      .subscribe((res: any) => {
        this.getBooks();
      });
  }
  onSearch() {
    this.searchSubject$.next(this.searchQuery);
  }

  onLoadSubject() {
    this.searchSubject$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((res: any) => {
        this.filteredBooks = this.bookList?.filter(
          (item: any) =>
            item.bookName.toLowerCase().includes(res) ||
            item.author.toLowerCase().includes(res)
        );
      });
  }

  getBooks() {
    this.http
      .get('http://localhost:7161/api/User/get-books')
      .subscribe((res: any) => {
        this.bookList = this.filteredBooks = res.content;
      });
  }
}

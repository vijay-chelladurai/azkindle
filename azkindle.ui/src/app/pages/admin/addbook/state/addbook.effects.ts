import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap } from 'rxjs';
import { addBook } from './addbook.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.services';

@Injectable()
export class AddBookEffects {
  private apiPrepend = 'http://localhost:7161/api/';
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private auth: AuthService
  ) {}

  addBook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addBook), // Listen for the register action
        mergeMap((action) => {
          var formData = new FormData();
          formData.append('bookName', action.book.bookName);
          formData.append('author', action.book.author);
          formData.append('stock', action.book.stock);
          formData.append('price', action.book.price);
          formData.append('image', action.book.image);

          return this.http
            .post('http://localhost:7161/api/admin/save-book', formData)
            .pipe(
              tap(() => {
                this.modalService.dismissAll();
                this.auth.triggerBooks();
              })
            );
        })
      ),
    { dispatch: false }
  );
}

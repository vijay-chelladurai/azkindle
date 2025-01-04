import { createAction, props } from '@ngrx/store';

export const addBook = createAction(
  '[Add Book] Add',
  props<{
    book: {
      bookName: string;
      author: string;
      stock: string;
      price: string;
      image: string;
    };
  }>()
);

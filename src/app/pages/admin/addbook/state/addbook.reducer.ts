import { createReducer, on } from "@ngrx/store";
import { addBook } from "./addbook.actions";


export interface AddBookState {
    bookName:string;
    author:string;
    stock:string;
    price:string;
    image:string;
}

export const initialState: AddBookState = {
    bookName:"",
    author:"",
    stock:"0",
    price:"0",
    image:""
};


export const addBookReducer = createReducer(
    initialState,
    on(addBook, (state, { book }) => ({
      ...state,
      bookName: book.bookName,
      author: book.author,
      stock: book.stock,
      price: book.price,
      image: book.image
    }))
  );
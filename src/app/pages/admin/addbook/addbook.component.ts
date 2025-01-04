import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addBook } from './state/addbook.actions';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent implements OnInit{

  addBookForm:any;

  @Output() formSubmitted= new EventEmitter();

  constructor(private fb:FormBuilder,private http:HttpClient,private store:Store){

  }
  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      bookName: ['', Validators.required],
      author: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      image: [''],
    });
  }

  get f() {
    return this.addBookForm.controls;
  }
  saveBoook(){
    console.log(this.addBookForm.value);


    if (this.addBookForm.valid) {
      const formValue = this.addBookForm.value;
      const sanitizedBook = {
        bookName: formValue.bookName || '', 
        author: formValue.author || '',
        stock: formValue.stock || '',
        price: formValue.price || '',
        image: formValue.image || '',
      };

      this.store.dispatch(addBook({ book: sanitizedBook }));
    }
  }


    // const formData= new FormData();
    // formData.append('bookName', this.addBookForm.value.bookName);
    // formData.append('author', this.addBookForm.value.author);
    // formData.append('stock', this.addBookForm.value.stock);
    // formData.append('price', this.addBookForm.value.price);
    // formData.append('image', this.addBookForm.value.image);

    // this.http.post("http://localhost:7161/api/admin/save-book",formData).subscribe((res:any)=>{
    //   this.formSubmitted.emit();
    // })
  // }
  onFileChange(event:any){
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.addBookForm.controls['image'].setValue(input.files[0]);
    }
  }




}

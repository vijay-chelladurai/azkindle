import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnInit() {
    this.loginForm = this.fb.group({
      emailAddress: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(10)]],
    });

    // this.loginForm = new FormGroup({
    //   emailAddress: new FormControl('first name'),
    //   password: new FormControl('last name')
    // });
  }
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }
  }
}

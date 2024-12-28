import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private api:HttpClient,private route:Router) {}


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
        this.api.post("http://localhost:7161/api/auth/login",this.loginForm.value).subscribe((res:any)=>{
          localStorage.setItem("token",JSON.stringify(res.token));
          if(this.extractToken(res.token).role=="Admin"){
            this.route.navigate(["/admin/dashboard"]);
          }
          else{
            this.route.navigate(["/user/dashboard"]);
          }
        })
      }
  }

  extractToken(token:String){
    return JSON.parse(atob(token.split('.')[1]));
  }
}

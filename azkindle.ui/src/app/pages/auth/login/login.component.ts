import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private api:HttpClient,private route:Router,private auth:AuthService) {}


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
          localStorage.setItem("token",res.content);
          if(this.auth.extractToken(res.content).role=="admin"){
            this.route.navigate(["/admin/dashboard"]);
          }
          else{
            this.route.navigate(["/user/dashboard"]);
          }
        })
      }
  }
}

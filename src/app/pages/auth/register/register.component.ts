import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: any;

  constructor(private fb: FormBuilder,private api:HttpClient,private route:Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        emailAddress: ['', [Validators.required, Validators.email]],
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        role: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
          ],
        ],
      },
      {
        Validators: this.passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }
  passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
  
      if (passwordControl?.value !== confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        return null;
      }
    };
  }




  get f() {
    return this.registerForm.controls;
  }

  register() {

    if(this.registerForm.valid){
      this.api.post("http://localhost:7161/api/Auth/register",this.registerForm.value).subscribe((res:any)=>{
         this.route.navigate(['/auth/login']);
      })
    }

  }
}

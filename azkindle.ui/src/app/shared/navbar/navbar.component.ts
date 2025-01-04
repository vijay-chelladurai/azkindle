import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public auth:AuthService,private router:Router){

  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }
}

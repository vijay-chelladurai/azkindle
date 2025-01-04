import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Injectable({
  providedIn: 'root',
})
export class AnonymousService {
  constructor(private router: Router,private auth:AuthService) {}
  canActivate() {
    let token = localStorage.getItem('token');
    if (!token) {
      return true;
    } else {
      if (this.auth.extractToken(token).role == 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/user/dashboard']);
      }
      return false;
    }
  }
}

export const AnonymousGuard: CanActivateFn = (route, state) => {
  return inject(AnonymousService).canActivate();
};

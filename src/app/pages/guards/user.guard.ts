import { inject, Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth.services";


@Injectable({
    providedIn: 'root'
})

export class UserGuardService {
    constructor(private router:Router,private auth:AuthService){

    }
    canActivate(){
        let token = localStorage.getItem("token");
        if(token && this.auth.extractToken(token).role=="user"){
            return true;
        }
        else{
            this.router.navigate(["/unauthorized"]);
            return false;
        }
      
    }
}


export const UserGuard: CanActivateFn =  (route, state) => {
    return inject(UserGuardService).canActivate();
};
  
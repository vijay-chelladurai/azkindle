import { inject, Injectable } from "@angular/core";
import { CanActivateFn, Route, Router } from "@angular/router";
import { AuthService } from "../../services/auth.services";


@Injectable({
    providedIn: 'root'
})

export class AdminGuardService {

    constructor(private router:Router,private auth:AuthService){

    }

    canActivate(){
        let token = localStorage.getItem("token");
        if(token && this.auth.extractToken(token).role=="admin"){
            return true;
        }
        else{
            this.router.navigate(["/unauthorized"]);
            return false;
        }
      
    }
}


export const AdminGuard: CanActivateFn =  (route, state) => {
    return inject(AdminGuardService).canActivate();
};
  
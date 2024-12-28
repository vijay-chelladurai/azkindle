import { inject, Injectable } from "@angular/core";
import { CanActivateFn } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class AdminGuardService {
    canActivate(){
        let token = localStorage.getItem("token");
        if(token && this.extractToken(token).role=="Admin"){
            return true;
        }
        else{
            return false;
        }
      
    }
     extractToken(token:any){
        return JSON.parse(atob(token.split('.')[1]));
      }

}


export const AdminGuard: CanActivateFn =  (route, state) => {
    return inject(AdminGuardService).canActivate();
};
  
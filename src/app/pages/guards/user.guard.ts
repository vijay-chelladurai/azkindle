import { inject, Injectable } from "@angular/core";
import { CanActivateFn } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class UserGuardService {
    canActivate(){
        let token = localStorage.getItem("token");
        if(token && this.extractToken(token).role=="user"){
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


export const UserGuard: CanActivateFn =  (route, state) => {
    return inject(UserGuardService).canActivate();
};
  
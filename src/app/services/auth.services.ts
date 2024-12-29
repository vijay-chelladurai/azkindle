import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})


export class AuthService{





    isAdmin():boolean{
        let token = this.getToken();
        return token && this.extractToken(token).role=="admin"? true:false;
    }
    isUser():boolean{
        let token = this.getToken();
        return token && this.extractToken(token).role=="user"? true:false;
    }

    extractToken(token:any){
        return token? JSON.parse(atob(token.split('.')[1])):"";
    }
    getToken(){
        return localStorage.getItem("token");
    }
    getUserName(){
        let token = this.getToken();
        return this.extractToken(token)?.fullName;
    }

}
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.services";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth:AuthService){
        
    }
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    let authToken=this.auth.getToken();
    let authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return handler.handle(authReq);
  }
}
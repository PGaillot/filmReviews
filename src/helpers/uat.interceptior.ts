import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL, BEARER } from "src/environments/environment";

@Injectable()
export class UatInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.includes(API_URL)){
            request = request.clone({
                setHeaders:{
                    accept: 'application/json',
                    Authorization: 'Bearer '+ BEARER
                }
            })
        }
        return next.handle(request);
    }

}
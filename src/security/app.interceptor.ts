import { AuthProvider } from './../providers/auth/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authProvider = this.injector.get(AuthProvider)
        let customHttpRequest: HttpRequest<any>

        return Observable.fromPromise(authProvider.getUserLogged()).mergeMap(user => {
            if (user) {
                customHttpRequest = req.clone({
                    headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
                })
                return next.handle(customHttpRequest)
            } else {
                return next.handle(req)
            }
        })


    }
}
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { exhaustMap, take, catchError } from 'rxjs/operators'
import { AuthService } from './auth.service'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.$userSubject.pipe(
            take(1),
            exhaustMap(user => {
                // console.log("INTERCEPT", user)
                if (!!user) {
                    let request = req.clone({ headers: new HttpHeaders({ "Authorization": `token ${user.getToken()}` }) })
                    // request.headers.set("Authorization", )
                    // console.log(request)
                    return next.handle(request)
                }
                else {

                    return next.handle(req)
                }
            }),
            catchError(err => {
                // console.log("Intercepted", err)
                if (err.status == 401) {
                    this.authService.logout()
                    return throwError("Please login!")
                }
                return throwError(err)
            })
        )

    }
}
import { Injectable } from '@angular/core'
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { toArray, take, map } from 'rxjs/operators'

import { AuthService } from './auth.service'

@Injectable({ 'providedIn': 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> {
        return this.authService.$userSubject.pipe(
            take(1),
            map(user => {
                const isAuthenticated = !!user
                if (isAuthenticated) { return true }
                else {
                    return this.router.createUrlTree(['auth', 'login'], { queryParams: { returnUrl: state.url } })
                }
            })
        )
    }
}


@Injectable({ 'providedIn': 'root' })
export class PreventAuthUserFromUnAuthRouteGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> {
        return this.authService.$userSubject.pipe(
            take(1),
            map(user => {
                const isAuthenticated = !!user
                if (isAuthenticated) {
                    return this.router.createUrlTree([''])
                }
                else {
                    return true
                }
            })
        )

        return true
    }
}
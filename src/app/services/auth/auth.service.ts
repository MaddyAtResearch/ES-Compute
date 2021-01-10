import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'
import { IUser } from '../../models/auth/user.interface'
import { AuthUser } from '../../models/auth/user.model'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_API_URL = `https://blog-backend-apis.herokuapp.com/auth/`
  $userSubject = new BehaviorSubject<AuthUser>(null)
  constructor(private http: HttpClient, private router: Router) { }

  login(user: IUser) {
    return this.http.post<AuthUser>(`${this.AUTH_API_URL}login`, user).pipe(
      tap(resp => this.handleAuthentication(resp)),
      catchError(this.handleError)
    )
  }

  register(user: IUser) {
    return this.http.post<AuthUser>(`${this.AUTH_API_URL}register`, user).pipe(
      tap(resp => this.handleAuthentication(resp)),
      catchError(this.handleError)
    )
  }

  auto_login() {
    let userData: AuthUser = JSON.parse(localStorage.getItem("user"))
    if (userData) {
      const user = new AuthUser(userData.token, userData.user)
      // console.log("USER", this)
      this.$userSubject.next(user)
      // this.$userSubject.next(user).bind(this)
    }

  }

  logout() {
    this.$userSubject.next(null)
    localStorage.removeItem("user")
    this.router.navigate(['auth', 'login'])

  }

  handleAuthentication(resp: AuthUser) {
    const user = new AuthUser(resp.token, resp.user)
    this.$userSubject.next(user)
    // console.log("here")
    localStorage.setItem("user", JSON.stringify(user))
    return user
  }

  handleError(err: HttpErrorResponse) {
    // console.log(err)
    let errorMessage = "Something went wrong!"
    if (err.status == 400) {
      if (err.error.non_field_errors) {
        errorMessage = err.error.non_field_errors[0]
      }
      if (err.error.username) {
        errorMessage = err.error.username[0]
      }

    }
    if (err.status == 0 && err.statusText == "Unknown Error") {
      errorMessage = "Something went wrong on server"
    }
    return throwError(errorMessage)
  }
}

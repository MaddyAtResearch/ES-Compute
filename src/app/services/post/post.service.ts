import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
import { Post } from '../../models/post/post.model'
import { catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  POST_API_URL = `${environment.api_url}post/`
  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    return this.http.get<Post[]>(this.POST_API_URL).pipe(catchError(this.errorHandler))
  }

  getPost(id: number) {
    return this.http.get<Post>(`${this.POST_API_URL}${id}`).pipe(
      catchError(this.errorHandler)
    )
  }

  addPost(post: Post) {
    return this.http.post(this.POST_API_URL, post).pipe(
      catchError(this.errorHandler)
    )
  }

  deletePost(id: number) {
    return this.http.delete(`${this.POST_API_URL}${id}`).subscribe(
      resp => this.router.navigate(['']),
    )
  }

  editPost(post: Post) {
    console.log("Post Service", post)
    return this.http.put(`${this.POST_API_URL}${post.id}/`, post)
  }


  errorHandler(err: HttpErrorResponse) {
    let errorMessage = "Someting went wrong"
    if (err.statusText == "Unknown Error") {
      errorMessage = "Server problem, Cannot fetch data"
    }
    if (err.status == 401) {
      errorMessage = "Please login"
    }
    if (err.status == 404) {
      errorMessage = "Could not find requested resource"
    }
    return throwError(errorMessage)
  }

}


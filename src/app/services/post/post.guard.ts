import { Injectable } from '@angular/core'
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, Subject, Subscription } from 'rxjs'
import { take, map, tap, exhaustMap, concatMap } from 'rxjs/operators'
import { AuthUser } from 'src/app/models/auth/user.model'
import { Post } from 'src/app/models/post/post.model'
import { AuthService } from '../auth/auth.service'
import { PostService } from './post.service'

@Injectable({ 'providedIn': 'root' })
export class IsPostOwner implements CanActivate {
    // $subs = new Subject<Post>()
    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private postService: PostService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> {
        const postId = route.params.id;
        const userData: AuthUser = JSON.parse(localStorage.getItem("user"))
        return this.postService.getPost(postId).pipe(map(post => {
            if (userData.user.username == post.author.username) {
                return true
            }
            return this.router.createUrlTree(['post', postId])

        }))
        return true
        // return true
    }
}



// @Injectable({ 'providedIn': 'root' })
// export class IsObsPostOwner implements CanActivate {
//     $postObs: Subscription
//     post: Post
//     constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private postService: PostService) { }
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> {
//         const postId = route.params.id;
//         // this.$postObs = this.postService.getPost(postId).subscribe(post => this.post = post)
//         return !!this.authService.$userSubject.pipe(
//             take(1),
//             tap(resp => console.log("TAPPING")),
//             map(user => {
//                 // return true;
//                 exhaustMap(() => {
//                     this.postService.getPost(postId).subscribe(post => {
//                         if (user.user.username == post.author.username) {
//                             return true
//                         }
//                         return null
//                     })
//                 })

//             }),
//             tap(resp => console.log("TAPPING"))
//         )

//         // return true
//         // return true
//     }
// }
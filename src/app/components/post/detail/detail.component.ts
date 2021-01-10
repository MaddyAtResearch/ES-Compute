import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { exhaustMap, switchMap, take, map } from 'rxjs/operators';
import { Post } from 'src/app/models/post/post.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy, AfterViewInit {
  post: Post
  errorMessage: string
  isOwner: boolean = false
  $subs: Subscription
  $authSubcription: Subscription
  loading: boolean = true
  @ViewChild('img') images;
  constructor(private route: ActivatedRoute, private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.$subs = this.route.params.subscribe(resp => {
      const id = resp.id;
      this.postService.getPost(id).subscribe(post => {
        this.post = post; this.loading = false;
        this.$authSubcription = this.authService.$userSubject.subscribe((user => {
          if (user.user.username == this.post.author.username) {
            this.isOwner = true

          }
        }))
      },
        err => {
          this.errorMessage = err;
          this.loading = false
        })
    });

  }

  ngAfterViewInit() {

    setTimeout(() => {
      let images = document.querySelectorAll('img')
      images.forEach(image => {
        console.log(image);
        image.classList.add('img-fluid');
        console.log(image.classList)
      })
    }, 1000)
  }


  onDeletePost() {
    let deleteChoice = confirm(`Delete Post ${this.post.title}`)

    if (deleteChoice) {
      this.postService.deletePost(this.post.id)
    }
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe()
    this.$authSubcription.unsubscribe()
  }

}

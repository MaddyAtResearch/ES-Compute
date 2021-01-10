import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post/post.model';
import { PostService } from '../../../services/post/post.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private postService: PostService) { }
  posts: Post[]
  errorMessage: string
  loading: boolean = true
  $postSubscription: Subscription
  filteredPosts: Post[]
  filterTerm: string = ''


  ngOnInit(): void {
    this.$postSubscription = this.postService.getPosts().subscribe(resp => {
      this.posts = resp
      this.filteredPosts = resp
      this.loading = false
    },
      err => {
        this.errorMessage = err;
        this.loading = false;
      })
  }

  searchPost(event: Event) {
    if (this.filterTerm == '') {
      this.filteredPosts = this.posts
    }
    else {
      this.filteredPosts = this.posts.filter(post => post.title.toLowerCase().includes(this.filterTerm.toLowerCase()))
    }
    console.log('searched', this.filterTerm)
  }
  ngOnDestroy(): void {
    this.$postSubscription.unsubscribe()
  }

}

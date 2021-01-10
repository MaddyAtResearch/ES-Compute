import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { Post } from 'src/app/models/post/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('postEditForm') postEditForm: NgForm
  errorMessage: string
  isLoading: boolean = true
  id: string
  post: Post
  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.isLoading = false
    this.id = this.route.snapshot.paramMap.get('id');
    this.postService.getPost(+this.id).subscribe(post => {
      this.post = post
      this.postEditForm.setValue({
        'title': post.title,
        'cover_img': post.cover_img,
        'content': post.content
      })


    })

  }

  onSubmit() {
    let post: Post = this.postEditForm.value;
    console.log("Form", post)
    post.id = this.post.id;
    this.postService.editPost(post).subscribe(resp => {
      this.router.navigate(['post', post.id])
    })
  }

}

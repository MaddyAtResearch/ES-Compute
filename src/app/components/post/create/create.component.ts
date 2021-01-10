import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs/operators';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };
  newsaya = "Jp"
  constructor(private postService: PostService, private router: Router) { }
  @ViewChild('postForm') form: NgForm
  errorMessage: string
  isLoading: boolean = true
  ngOnInit(): void {
    this.isLoading = false
  }

  onSubmit() {
    console.log(this.form.value)
    if (this.form.invalid) { return }
    else {
      const values = this.form.value
      const data = {
        'title': values.title,
        'cover_img': values.cover,
        'content': values.content
      }
      this.postService.addPost(data).subscribe(resp => {
        this.router.navigate([''])
      },
        err => this.errorMessage = err)

    }
  }

}

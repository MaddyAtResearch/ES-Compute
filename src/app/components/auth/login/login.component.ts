import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm
  returnUrl: string;
  errorMessage: string
  isSubmitting: boolean = false
  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }
  onLogin() {
    this.isSubmitting = true
    const user = this.loginForm.value;
    this.authService.login(user).subscribe(resp => {
      this.isSubmitting = false
      this.router.navigateByUrl(this.returnUrl)


    },
      err => { this.isSubmitting = false; this.errorMessage = err })
  }
}

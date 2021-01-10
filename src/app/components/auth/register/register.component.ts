import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  isSubmitting: boolean = false
  errorMessage: string
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.minLength(8), Validators.required])
    })
  }

  onRegister() {
    if (this.registerForm.invalid) { return }
    this.isSubmitting = true
    const user = this.registerForm.value
    this.authService.register(user).subscribe(resp => {
      console.log(resp);
      this.isSubmitting = false
      this.router.navigate([''])
    },
      err => this.errorMessage = err)
  }
}

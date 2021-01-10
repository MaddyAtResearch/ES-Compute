import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }
  isAuthenticated: boolean = false
  ngOnInit(): void {
    this.authService.$userSubject.subscribe(user => {
      if (!!user) { this.isAuthenticated = true }
      else {
        this.isAuthenticated = false
      }

    })
  }

  onLogout() {
    this.authService.logout()
    this.isAuthenticated = false
  }

}

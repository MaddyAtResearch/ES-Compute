import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'EsCompute';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.auto_login()
  }
}

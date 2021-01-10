import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/post/home/home.component';
import { PostComponent } from './components/post/post/post.component';
import { DetailComponent } from './components/post/detail/detail.component';
import { CreateComponent } from './components/post/create/create.component';
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthComponent } from './components/auth/auth/auth.component';
import { LoadingComponent } from './components/ui/loading/loading.component';
import { ErrorComponent } from './components/shared/error/error.component';

import { AuthInterceptor } from './services/auth/auth.interceptor';
import { EditComponent } from './components/post/edit/edit.component'

import { QuillModule } from 'ngx-quill';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { FooterComponent } from './components/ui/footer/footer.component'


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    PostComponent,
    DetailComponent,
    CreateComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    LoadingComponent,
    ErrorComponent,
    EditComponent,
    NotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

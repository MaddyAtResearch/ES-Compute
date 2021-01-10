import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CreateComponent } from './components/post/create/create.component';
import { DetailComponent } from './components/post/detail/detail.component';
import { EditComponent } from './components/post/edit/edit.component';
import { HomeComponent } from './components/post/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component'

import { AuthGuard, PreventAuthUserFromUnAuthRouteGuard } from './services/auth/auth.guard'
import { IsPostOwner } from './services/post/post.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard,]
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard,]
  },
  {
    path: 'post/:id',
    component: DetailComponent,
    canActivate: [AuthGuard,]
  },
  {
    path: 'post/:id/edit',
    component: EditComponent,
    canActivate: [AuthGuard, IsPostOwner]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [PreventAuthUserFromUnAuthRouteGuard,],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

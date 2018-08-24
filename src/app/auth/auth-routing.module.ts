import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyProjectsComponent } from '../projects/my-projects/my-projects.component';
import { FavoriteProjectsComponent } from '../projects/favorite-projects/favorite-projects.component';

const authRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
 
  { path: 'favorite', component: FavoriteProjectsComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
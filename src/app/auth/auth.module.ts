import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyProjectsComponent } from "../projects/my-projects/my-projects.component";
import { FavoriteProjectsComponent } from "../projects/favorite-projects/favorite-projects.component";


@NgModule({
	declarations:[
		SignupComponent,
		SigninComponent,
		UserProfileComponent,
		MyProjectsComponent,
		FavoriteProjectsComponent
	],
	imports:[
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AuthRoutingModule
	]
})
export class AuthModule{}
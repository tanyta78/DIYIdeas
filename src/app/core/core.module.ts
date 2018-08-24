import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "../auth/auth-guard.service";
import { ProjectService } from "../projects/project.service";
import { UserService } from "../admin/user.service";
import { SuccessInterceptor } from "./interceptors/success.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AdminGuard } from "../auth/admin.guard";

@NgModule({
	declarations: [
		HeaderComponent,
		HomeComponent
	],
	imports: [
		SharedModule,
		AppRoutingModule
	],
	exports: [
		AppRoutingModule,
		HeaderComponent
	],
	providers: [
		ShoppingListService,
		ProjectService,
		UserService,
		DataStorageService,
		AuthService,
		AuthGuard,
		AdminGuard,
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: SuccessInterceptor,
		// 	multi: true
		// // },
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: ErrorInterceptor,
		// 	multi: true
		// },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	]
})
export class CoreModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { AdminComponent } from './admin.component';
import { AdminStartComponent } from './admin-start/admin-start.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const adminRoutes: Routes = [
	{
		path: '', component: AdminComponent, children: [
			{ path: '', component: AdminStartComponent },
			{ path: 'new', component: UserEditComponent, canActivate: [AuthGuard] },
			{ path: ':id', component: UserDetailComponent,canActivate: [AuthGuard] },
			{ path: ':id/edit', component: UserEditComponent, canActivate: [AuthGuard] },
			{ path: ':id/delete', component: UserEditComponent, canActivate: [AuthGuard] }
		]
	}];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
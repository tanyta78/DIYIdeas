import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminStartComponent } from './admin-start/admin-start.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserItemComponent } from './user-list/user-item/user-item.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    AdminStartComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailComponent,
    UserItemComponent
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './views/user-list/user-list.component';
import { UserCreateComponent } from './views/user-create/user-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserCreateFormComponent } from './components/user-create-form/user-create-form.component';
import {NgxPaginationModule} from "ngx-pagination";
import { UserUpdateFormComponent } from './components/user-update-form/user-update-form.component';
import { UserUpdateComponent } from './views/user-update/user-update.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserCreateFormComponent,
    UserUpdateFormComponent,
    UserUpdateComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule
    ]
})
export class UserModule { }

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
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


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
        SharedModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatSortModule,
        MatPaginatorModule,
        MatCardModule,
        MatSlideToggleModule
    ]
})
export class UserModule { }

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
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";


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

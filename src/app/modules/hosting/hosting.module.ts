import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostingRoutingModule } from './hosting-routing.module';
import { HostingDashboardComponent } from './views/hosting-dashboard/hosting-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { HostingCreateComponent } from './views/hosting-create/hosting-create.component';
import { HostingFormComponent } from './components/hosting-form/hosting-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import { HostingEditComponent } from './views/hosting-edit/hosting-edit.component';
import {SharedModule} from "../shared/shared.module";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    HostingDashboardComponent,
    HostingCreateComponent,
    HostingFormComponent,
    HostingEditComponent
  ],
  imports: [
    CommonModule,
    HostingRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule,
    SharedModule,
    MatSortModule
  ]
})
export class HostingModule { }

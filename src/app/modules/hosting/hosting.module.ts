import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostingRoutingModule } from './hosting-routing.module';
import { HostingDashboardComponent } from './views/hosting-dashboard/hosting-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import { HostingCreateComponent } from './views/hosting-create/hosting-create.component';
import { HostingFormComponent } from './components/hosting-form/hosting-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
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

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {ProjectDashboardComponent} from './views/project-dashboard/project-dashboard.component';
import {ProjectNewComponent} from "./views/project-new/project-new.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProjectEditComponent} from './views/project-edit/project-edit.component';
import {NgxPaginationModule} from "ngx-pagination";
import {NgxAutocompleteModule} from "ngx-angular-autocomplete";
import {ProjectFormComponent} from './components/project-form/project-form.component';
import { ProjectInvoicingComponent } from './views/project-invoicing/project-invoicing.component';
import {ProjectDetailDialog, ProjectTableComponent} from './components/project-table/project-table.component';
import {SharedModule} from "../shared/shared.module";
import { ProjectContentPreviewComponent } from './components/project-content-preview/project-content-preview.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectNewComponent,
    ProjectEditComponent,
    ProjectFormComponent,
    ProjectInvoicingComponent,
    ProjectTableComponent,
    ProjectContentPreviewComponent,
    ProjectDetailDialog
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxAutocompleteModule,
    FormsModule,
    SharedModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
  ]
})
export class ProjectModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {NgxAutocompleteModule} from "ngx-angular-autocomplete";
import {NgxPaginationModule} from "ngx-pagination";
import { ProjectDashboardComponent } from './views/project-dashboard/project-dashboard.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectDetailsComponent } from './views/project-details/project-details.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";
import { ProjectCommissionFormComponent } from './components/project-commission-form/project-commission-form.component';
import { ProjectCommissionDialogFormComponent } from './components/project-commission-dialog-form/project-commission-dialog-form.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ProjectStatisticsComponent } from './views/project-statistics/project-statistics.component';
import {MatListModule} from "@angular/material/list";
import { ProjectNewspaperToolDialogComponent } from './components/project-newspaper-tool-dialog/project-newspaper-tool-dialog.component';
import {NewspaperModule} from "../newspaper/newspaper.module";
import {NgxPrintElementModule} from "ngx-print-element";
import {NgxDropzoneModule} from "ngx-dropzone";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
  declarations: [
    ProjectDashboardComponent,
    CreateProjectComponent,
    ProjectDetailsComponent,
    ProjectCommissionFormComponent,
    ProjectCommissionDialogFormComponent,
    ProjectStatisticsComponent,
    ProjectNewspaperToolDialogComponent
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
        MatDatepickerModule,
        MatMomentDateModule,
        MatExpansionModule,
        MatStepperModule,
        MatMenuModule,
        MatCheckboxModule,
        MatListModule,
        NewspaperModule,
        NgxPrintElementModule,
        NgxDropzoneModule,
        EditorComponent,
        MatChipsModule
    ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY'
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ]
})
export class ProjectModule {
}

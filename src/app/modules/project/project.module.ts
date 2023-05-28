import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
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
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import { ProjectStatisticsComponent } from './views/project-statistics/project-statistics.component';
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import { ProjectNewspaperToolDialogComponent } from './components/project-newspaper-tool-dialog/project-newspaper-tool-dialog.component';
import {NewspaperModule} from "../newspaper/newspaper.module";
import {NgxPrintElementModule} from "ngx-print-element";
import {NgxDropzoneModule} from "ngx-dropzone";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import { SelectContentPurchaseDialogComponent } from './components/select-content-purchase-dialog/select-content-purchase-dialog.component';
import {MatLegacyRadioModule as MatRadioModule} from "@angular/material/legacy-radio";


@NgModule({
  declarations: [
    ProjectDashboardComponent,
    CreateProjectComponent,
    ProjectDetailsComponent,
    ProjectCommissionFormComponent,
    ProjectCommissionDialogFormComponent,
    ProjectStatisticsComponent,
    ProjectNewspaperToolDialogComponent,
    SelectContentPurchaseDialogComponent
  ],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
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
        MatChipsModule,
        MatRadioModule
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

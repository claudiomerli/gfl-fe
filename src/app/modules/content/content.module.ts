import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentRoutingModule} from './content-routing.module';
import {ContentDetailComponent} from './views/content-detail/content-detail.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MatLegacyOptionModule as MatOptionModule} from "@angular/material/legacy-core";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";
import {ContentListComponent} from './views/content-list/content-list.component';
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {ContentHintDialogFormComponent} from './components/content-hint-dialog-form/content-hint-dialog-form.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {NgxDropzoneModule} from "ngx-dropzone";
import { ContentHintTemplateDialogFormComponent } from './components/content-hint-template-dialog-form/content-hint-template-dialog-form.component';
import { ContentAssistantDialogComponent } from './components/content-assistant-dialog/content-assistant-dialog.component';


@NgModule({
  declarations: [
    ContentDetailComponent,
    ContentListComponent,
    ContentHintDialogFormComponent,
    ContentHintTemplateDialogFormComponent,
    ContentAssistantDialogComponent
  ],
    imports: [
        CommonModule,
        ContentRoutingModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSidenavModule,
        EditorComponent,
        MatButtonModule,
        MatListModule,
        MatChipsModule,
        MatIconModule,
        SharedModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDialogModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatMomentDateModule,
        FormsModule,
        MatCardModule,
        NgxDropzoneModule
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
export class ContentModule {
}

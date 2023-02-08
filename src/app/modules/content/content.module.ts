import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentRoutingModule} from './content-routing.module';
import {ContentDetailComponent} from './views/content-detail/content-detail.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DATE_FORMATS, MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";
import {ContentListComponent} from './views/content-list/content-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {ContentHintDialogFormComponent} from './components/content-hint-dialog-form/content-hint-dialog-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatCardModule} from "@angular/material/card";
import {NgxDropzoneModule} from "ngx-dropzone";


@NgModule({
  declarations: [
    ContentDetailComponent,
    ContentListComponent,
    ContentHintDialogFormComponent
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

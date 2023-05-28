import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorStatisticsRoutingModule } from './editor-statistics-routing.module';
import { EditorStatisticsDashboardComponent } from './views/editor-statistics-dashboard/editor-statistics-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";


@NgModule({
  declarations: [
    EditorStatisticsDashboardComponent
  ],
  imports: [
    CommonModule,
    EditorStatisticsRoutingModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatListModule
  ]
})
export class EditorStatisticsModule { }

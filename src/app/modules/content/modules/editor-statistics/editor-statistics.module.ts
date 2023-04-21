import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorStatisticsRoutingModule } from './editor-statistics-routing.module';
import { EditorStatisticsDashboardComponent } from './views/editor-statistics-dashboard/editor-statistics-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";


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

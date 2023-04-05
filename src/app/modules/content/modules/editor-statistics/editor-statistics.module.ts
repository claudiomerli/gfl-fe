import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorStatisticsRoutingModule } from './editor-statistics-routing.module';
import { EditorStatisticsDashboardComponent } from './views/editor-statistics-dashboard/editor-statistics-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";


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
        MatSelectModule
    ]
})
export class EditorStatisticsModule { }

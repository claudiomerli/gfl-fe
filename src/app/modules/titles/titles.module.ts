import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitlesRoutingModule } from './titles-routing.module';
import { TitlesDashboardComponent } from './views/titles-dashboard/titles-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatSortModule} from "@angular/material/sort";
import {SharedModule} from "../shared/shared.module";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";


@NgModule({
  declarations: [
    TitlesDashboardComponent
  ],
  imports: [
    CommonModule,
    TitlesRoutingModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    SharedModule,
    MatPaginatorModule
  ]
})
export class TitlesModule { }

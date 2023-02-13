import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitlesRoutingModule } from './titles-routing.module';
import { TitlesDashboardComponent } from './views/titles-dashboard/titles-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {SharedModule} from "../shared/shared.module";
import {MatPaginatorModule} from "@angular/material/paginator";


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

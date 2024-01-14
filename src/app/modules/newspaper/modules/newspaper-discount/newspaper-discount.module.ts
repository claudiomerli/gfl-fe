import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspaperDiscountRoutingModule } from './newspaper-discount-routing.module';
import { NewspaperDiscountDashboardComponent } from './views/newspaper-discount-dashboard/newspaper-discount-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import { NewspaperDiscountFormDialogComponent } from './components/newspaper-discount-form-dialog/newspaper-discount-form-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    NewspaperDiscountDashboardComponent,
    NewspaperDiscountFormDialogComponent
  ],
    imports: [
        CommonModule,
        NewspaperDiscountRoutingModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule
    ]
})
export class NewspaperDiscountModule { }

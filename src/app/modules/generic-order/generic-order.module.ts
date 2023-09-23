import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericOrderRoutingModule } from './generic-order-routing.module';
import { GenericOrderListComponent } from './views/generic-order-list/generic-order-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SharedModule} from "../shared/shared.module";
import { GenericOrderDetailComponent } from './views/generic-order-detail/generic-order-detail.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    GenericOrderListComponent,
    GenericOrderDetailComponent
  ],
  imports: [
    CommonModule,
    GenericOrderRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatListModule
  ]
})
export class GenericOrderModule { }

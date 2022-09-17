import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './views/order-list/order-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { OrderFilterComponent } from './component/order-filter/order-filter.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import { OrderFormComponent } from './component/order-form/order-form.component';
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import { OrderUpdateComponent } from './views/order-update/order-update.component';
import {MatDividerModule} from "@angular/material/divider";
import { OrderDraftDialogComponent } from './component/order-draft-dialog/order-draft-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { RequestQuoteDialogComponent } from './component/request-quote-dialog/request-quote-dialog.component';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    OrderListComponent,
    OrderFilterComponent,
    OrderFormComponent,
    OrderUpdateComponent,
    OrderDraftDialogComponent,
    RequestQuoteDialogComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    SharedModule,
    MatCardModule,
    MatPaginatorModule,
    MatDividerModule,
    MatDialogModule,
    EditorComponent,
    MatMenuModule,
    MatListModule
  ]
})
export class OrderModule { }

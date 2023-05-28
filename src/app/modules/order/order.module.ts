import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './views/order-list/order-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { OrderFilterComponent } from './component/order-filter/order-filter.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from "@angular/material/legacy-progress-spinner";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import { OrderFormComponent } from './component/order-form/order-form.component';
import {SharedModule} from "../shared/shared.module";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import { OrderUpdateComponent } from './views/order-update/order-update.component';
import {MatDividerModule} from "@angular/material/divider";
import { OrderDraftDialogComponent } from './component/order-draft-dialog/order-draft-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import { RequestQuoteDialogComponent } from './component/request-quote-dialog/request-quote-dialog.component';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";


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

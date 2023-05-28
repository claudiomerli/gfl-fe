import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPackRoutingModule } from './order-pack-routing.module';
import { OrderPackListComponent } from './views/order-pack-list/order-pack-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import { OrderPackListAdminComponent } from './components/order-pack-list-admin/order-pack-list-admin.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatSortModule} from "@angular/material/sort";
import { OrderPackCreateComponent } from './views/order-pack-create/order-pack-create.component';
import { OrderPackFormComponent } from './components/order-pack-form/order-pack-form.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import { OrderPackEditComponent } from './views/order-pack-edit/order-pack-edit.component';
import { OrderPackListCustomerComponent } from './components/order-pack-list-customer/order-pack-list-customer.component';
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";


@NgModule({
  declarations: [
    OrderPackListComponent,
    OrderPackListAdminComponent,
    OrderPackCreateComponent,
    OrderPackFormComponent,
    OrderPackEditComponent,
    OrderPackListCustomerComponent
  ],
    imports: [
        CommonModule,
        OrderPackRoutingModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatIconModule,
        MatButtonModule,
        SharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        MatListModule
    ]
})
export class OrderPackModule { }

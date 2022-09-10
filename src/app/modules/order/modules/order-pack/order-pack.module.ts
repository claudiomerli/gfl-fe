import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPackRoutingModule } from './order-pack-routing.module';
import { OrderPackListComponent } from './views/order-pack-list/order-pack-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { OrderPackListAdminComponent } from './components/order-pack-list-admin/order-pack-list-admin.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { OrderPackCreateComponent } from './views/order-pack-create/order-pack-create.component';
import { OrderPackFormComponent } from './components/order-pack-form/order-pack-form.component';
import {MatCardModule} from "@angular/material/card";
import { OrderPackEditComponent } from './views/order-pack-edit/order-pack-edit.component';
import { OrderPackListCustomerComponent } from './components/order-pack-list-customer/order-pack-list-customer.component';
import {MatListModule} from "@angular/material/list";


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

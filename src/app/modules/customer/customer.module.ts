import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './views/customer-list/customer-list.component';
import { CustomerCreateComponent } from './views/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './views/customer-update/customer-update.component';
import { CustomerSaveFormComponent } from './components/customer-save-form/customer-save-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerUpdateComponent,
    CustomerSaveFormComponent
  ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class CustomerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './views/customer-dashboard/customer-dashboard.component';
import { CustomerNewComponent } from './views/customer-new/customer-new.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerRoutingModule} from "./customer-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CustomerNewComponent
  ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class CustomerModule { }

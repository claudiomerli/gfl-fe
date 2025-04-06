import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerMonitorRoutingModule} from './customer-monitor-routing.module';
import { CustomerMonitorComponent } from './views/customer-monitor/customer-monitor.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {SharedModule} from "../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    CustomerMonitorComponent
  ],
  imports: [
    CommonModule,
    CustomerMonitorRoutingModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class CustomerMonitorModule {
}

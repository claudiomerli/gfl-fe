import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservedRoutingModule } from './reserved-routing.module';
import { CustomerContentComponent } from './views/customer-content/customer-content.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CustomerContentComponent
  ],
  imports: [
    CommonModule,
    ReservedRoutingModule,
    FormsModule
  ]
})
export class ReservedModule { }

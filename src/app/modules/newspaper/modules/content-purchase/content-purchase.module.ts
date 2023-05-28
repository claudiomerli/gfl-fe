import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentPurchaseRoutingModule} from './content-purchase-routing.module';
import {ContentPurhaseListComponent} from './views/content-purhase-list/content-purhase-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {ContentPurchaseCreateComponent} from './views/content-purchase-create/content-purchase-create.component';
import {ContentPurchaseFormComponent} from './components/content-purchase-form/content-purchase-form.component';
import {ContentPurchaseDetailsComponent} from './views/content-purchase-details/content-purchase-details.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MatMomentDateModule} from "@angular/material-moment-adapter";


@NgModule({
  declarations: [
    ContentPurhaseListComponent,
    ContentPurchaseCreateComponent,
    ContentPurchaseFormComponent,
    ContentPurchaseDetailsComponent
  ],
  imports: [
    CommonModule,
    ContentPurchaseRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY'
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ]
})
export class ContentPurchaseModule {
}

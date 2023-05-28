import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentPurchaseRoutingModule} from './content-purchase-routing.module';
import {ContentPurhaseListComponent} from './views/content-purhase-list/content-purhase-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
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

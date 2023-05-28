import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DomainRoutingModule} from './domain-routing.module';
import {DomainDashboardComponent} from './views/domain-dashboard/domain-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DomainCreateComponent} from './views/domain-create/domain-create.component';
import {DomainFormComponent} from './components/domain-form/domain-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {DomainEditComponent} from './views/domain-edit/domain-edit.component';
import {SharedModule} from "../shared/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    DomainDashboardComponent,
    DomainCreateComponent,
    DomainFormComponent,
    DomainEditComponent
  ],
  imports: [
    CommonModule,
    DomainRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule,
    SharedModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatSortModule,
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
export class DomainModule {
}

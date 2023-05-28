import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspaperRoutingModule } from './newspaper-routing.module';
import { NewspaperSaveFormComponent } from './components/newspaper-save-form/newspaper-save-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NewspaperListComponent } from './views/newspaper-list/newspaper-list.component';
import { NewspaperCreateComponent } from './views/newspaper-create/newspaper-create.component';
import { NewspaperUpdateComponent } from './views/newspaper-update/newspaper-update.component';
import {NgxPaginationModule} from "ngx-pagination";
import {SharedModule} from "../shared/shared.module";
import { NewspaperSearchFilterComponent } from './components/newspaper-search-filter/newspaper-search-filter.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import { ChooseOrderDialogComponent } from './components/choose-order-dialog/choose-order-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import { CommissionHistoryDialogComponent } from './components/commission-history-dialog/commission-history-dialog.component';
import {MatStepperModule} from "@angular/material/stepper";
import { NewspaperTableComponent } from './components/newspaper-table/newspaper-table.component';


@NgModule({
    declarations: [
        NewspaperSaveFormComponent,
        NewspaperListComponent,
        NewspaperCreateComponent,
        NewspaperUpdateComponent,
        NewspaperSearchFilterComponent,
        ChooseOrderDialogComponent,
        CommissionHistoryDialogComponent,
        NewspaperTableComponent
    ],
  exports: [
    NewspaperSearchFilterComponent,
    NewspaperListComponent,
    NewspaperTableComponent
  ],
    imports: [
        CommonModule,
        NewspaperRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        NgxSliderModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatMenuModule,
        MatChipsModule,
        MatDialogModule,
        MatCheckboxModule,
        MatStepperModule
    ]
})
export class NewspaperModule { }

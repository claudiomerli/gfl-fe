import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspaperRoutingModule } from './newspaper-routing.module';
import { NewspaperSaveFormComponent } from './components/newspaper-save-form/newspaper-save-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NewspaperListComponent } from './views/newspaper-list/newspaper-list.component';
import { NewspaperCreateComponent } from './views/newspaper-create/newspaper-create.component';
import { NewspaperUpdateComponent } from './views/newspaper-update/newspaper-update.component';
import {SharedModule} from "../shared/shared.module";
import { NewspaperSearchFilterComponent } from './components/newspaper-search-filter/newspaper-search-filter.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {MatChipsModule} from "@angular/material/chips";
import { ChooseOrderDialogComponent } from './components/choose-order-dialog/choose-order-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
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

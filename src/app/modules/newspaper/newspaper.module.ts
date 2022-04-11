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


@NgModule({
    declarations: [
        NewspaperSaveFormComponent,
        NewspaperListComponent,
        NewspaperCreateComponent,
        NewspaperUpdateComponent,
        NewspaperSearchFilterComponent
    ],
    exports: [
        NewspaperSearchFilterComponent
    ],
    imports: [
        CommonModule,
        NewspaperRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule
    ]
})
export class NewspaperModule { }

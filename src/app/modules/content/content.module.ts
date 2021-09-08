import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentListComponent } from './views/content-list/content-list.component';
import { ContentSearchFilterComponent } from './components/content-search-filter/content-search-filter.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {SharedModule} from "../shared/shared.module";
import { ContentCreateComponent } from './views/content-create/content-create.component';
import { ContentFormComponent } from './components/content-form/content-form.component';


@NgModule({
  declarations: [
    ContentListComponent,
    ContentSearchFilterComponent,
    ContentCreateComponent,
    ContentFormComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class ContentModule { }

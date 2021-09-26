import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentRoutingModule} from './content-routing.module';
import {ContentListComponent} from './views/content-list/content-list.component';
import {ContentSearchFilterComponent} from './components/content-search-filter/content-search-filter.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {SharedModule} from "../shared/shared.module";
import {ContentCreateComponent} from './views/content-create/content-create.component';
import {ContentFormComponent} from './components/content-form/content-form.component';
import {NgxTinymceModule} from "ngx-tinymce";
import { ContentUpdateComponent } from './views/content-update/content-update.component';


@NgModule({
  declarations: [
    ContentListComponent,
    ContentSearchFilterComponent,
    ContentCreateComponent,
    ContentFormComponent,
    ContentUpdateComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    NgxTinymceModule.forRoot({
      config : {
        height : "600px",
        plugins: 'wordcount',
        toolbar: 'wordcount'
      },
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
    })
  ]
})
export class ContentModule {
}

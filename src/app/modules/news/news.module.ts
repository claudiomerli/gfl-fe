import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './views/news-list/news-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import { CreateNewsComponent } from './views/create-news/create-news.component';
import { NewsFormComponent } from './component/news-form/news-form.component';
import {SharedModule} from "../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { NewsDetailComponent } from './views/news-detail/news-detail.component';
import {MatCardModule} from "@angular/material/card";
import { NewsListDetailComponent } from './component/news-list-detail/news-list-detail.component';
import { EditNewsComponent } from './views/edit-news/edit-news.component';
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    NewsListComponent,
    CreateNewsComponent,
    NewsFormComponent,
    NewsDetailComponent,
    NewsListDetailComponent,
    EditNewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatToolbarModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    EditorComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
  ]
})
export class NewsModule { }

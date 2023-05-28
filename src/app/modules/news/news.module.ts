import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './views/news-list/news-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import { CreateNewsComponent } from './views/create-news/create-news.component';
import { NewsFormComponent } from './component/news-form/news-form.component';
import {SharedModule} from "../shared/shared.module";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {ReactiveFormsModule} from "@angular/forms";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import { NewsDetailComponent } from './views/news-detail/news-detail.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import { NewsListDetailComponent } from './component/news-list-detail/news-list-detail.component';
import { EditNewsComponent } from './views/edit-news/edit-news.component';
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";


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

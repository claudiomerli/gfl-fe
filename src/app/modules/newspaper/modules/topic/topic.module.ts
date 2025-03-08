import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TopicRoutingModule} from './topic-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NewspaperModule} from "../../newspaper.module";
import {SharedModule} from "../../../shared/shared.module";
import {TopicListComponent} from './views/topic-list/topic-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TopicListComponent
  ],
  imports: [
    CommonModule,
    TopicRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    NewspaperModule,
    SharedModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class TopicModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {ProjectDashboardComponent} from './views/project-dashboard/project-dashboard.component';
import {ProjectNewComponent} from "./views/project-new/project-new.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProjectEditComponent} from './views/project-edit/project-edit.component';
import {NgxPaginationModule} from "ngx-pagination";
import {NgxAutocompleteModule} from "ngx-angular-autocomplete";
import {ProjectFormComponent} from './components/project-form/project-form.component';


@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectNewComponent,
    ProjectEditComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxAutocompleteModule,
    FormsModule,
  ]
})
export class ProjectModule {
}

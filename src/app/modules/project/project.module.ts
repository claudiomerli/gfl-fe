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
import { ProjectInvoicingComponent } from './views/project-invoicing/project-invoicing.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import {SharedModule} from "../shared/shared.module";
import { ProjectContentPreviewComponent } from './components/project-content-preview/project-content-preview.component';


@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectNewComponent,
    ProjectEditComponent,
    ProjectFormComponent,
    ProjectInvoicingComponent,
    ProjectTableComponent,
    ProjectContentPreviewComponent
  ],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxAutocompleteModule,
        FormsModule,
        SharedModule,
    ]
})
export class ProjectModule {
}

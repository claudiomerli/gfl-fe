import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDashboardComponent } from './views/project-dashboard/project-dashboard.component';
import {ProjectNewComponent} from "./views/project-new/project-new.component";
import {ReactiveFormsModule} from "@angular/forms";
import { ProjectEditComponent } from './views/project-edit/project-edit.component';


@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectNewComponent,
    ProjectEditComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProjectModule { }

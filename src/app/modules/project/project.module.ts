import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDashboardComponent } from './views/project-dashboard/project-dashboard.component';


@NgModule({
  declarations: [
    ProjectDashboardComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }

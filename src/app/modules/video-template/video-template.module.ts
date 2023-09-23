import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoTemplateRoutingModule } from './video-template-routing.module';
import { VideoTemplateDashboardComponent } from './views/video-template-dashboard/video-template-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import { VideoTemplateCardComponent } from './components/video-template-card/video-template-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    VideoTemplateDashboardComponent,
    VideoTemplateCardComponent
  ],
  imports: [
    CommonModule,
    VideoTemplateRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ]
})
export class VideoTemplateModule { }

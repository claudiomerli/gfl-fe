import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VideoTemplateDashboardComponent} from "./views/video-template-dashboard/video-template-dashboard.component";

const routes: Routes = [
  {path: '', component: VideoTemplateDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoTemplateRoutingModule {
}

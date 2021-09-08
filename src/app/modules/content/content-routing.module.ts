import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentListComponent} from "./views/content-list/content-list.component";
import {ContentCreateComponent} from "./views/content-create/content-create.component";

const routes: Routes = [
  {path: "", component: ContentListComponent},
  {path: "create", component: ContentCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {
}

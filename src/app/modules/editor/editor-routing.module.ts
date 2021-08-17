import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorListComponent} from "./views/editor-list/editor-list.component";
import {EditorCreateComponent} from "./views/editor-create/editor-create.component";

const routes: Routes = [
  {path: "", component: EditorListComponent},
  {path: "create", component: EditorCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {
}

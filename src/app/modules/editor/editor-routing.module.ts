import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorListComponent} from "./views/editor-list/editor-list.component";
import {EditorCreateComponent} from "./views/editor-create/editor-create.component";
import {EditorUpdateFormComponent} from "./components/editor-update-form/editor-update-form.component";
import {EditorUpdateComponent} from "./views/editor-update/editor-update.component";

const routes: Routes = [
  {path: "", component: EditorListComponent},
  {path: "create", component: EditorCreateComponent},
  {path: ":id", component: EditorUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {
}

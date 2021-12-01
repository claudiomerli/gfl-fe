import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./views/user-list/user-list.component";
import {UserCreateComponent} from "./views/user-create/user-create.component";
import {UserUpdateFormComponent} from "./components/user-update-form/user-update-form.component";
import {UserUpdateComponent} from "./views/user-update/user-update.component";

const routes: Routes = [
  {path: "", component: UserListComponent},
  {path: "create", component: UserCreateComponent},
  {path: ":id", component: UserUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

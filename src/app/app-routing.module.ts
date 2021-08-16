import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./modules/shared/guards/auth.guard";

const routes: Routes = [
  {path: "", redirectTo: "/projects", pathMatch: "full"},
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "projects",
    loadChildren: () => import("./modules/project/project.module").then(m => m.ProjectModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

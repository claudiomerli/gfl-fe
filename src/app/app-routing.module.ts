import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./modules/shared/guards/auth.guard";
import {RedirectGuard} from "./modules/shared/guards/redirect.guard";

const routes: Routes = [
  {
    path: "", pathMatch: "full", redirectTo: "", canActivate: [RedirectGuard]
  },
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "projects",
    loadChildren: () => import("./modules/project/project.module").then(m => m.ProjectModule),
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    loadChildren: () => import("./modules/user/user.module").then(m => m.UserModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN']}
  },
  {
    path: "newspapers",
    loadChildren: () => import("./modules/newspaper/newspaper.module").then(m => m.NewspaperModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN', 'CUSTOMER']}
  },
  {
    path: "orders",
    loadChildren: () => import("./modules/order/order.module").then(m => m.OrderModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN', 'CUSTOMER']}
  },
  {
    path: "news",
    loadChildren: () => import("./modules/news/news.module").then(m => m.NewsModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN', 'CUSTOMER']}
  },
  {
    path: "statistics",
    loadChildren: () => import("./modules/statistics/statistics.module").then(m => m.StatisticsModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN', 'CUSTOMER']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

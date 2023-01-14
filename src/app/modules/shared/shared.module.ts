import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import {IsAuthenticatedDirective} from './directives/is-authenticated.directive';

import {FormsModule} from "@angular/forms";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {ErrorsComponent} from "./components/errors/errors.component";
import {IsNotInRoleDirective} from "./directives/is-not-in-role.directive";
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import { ExtractLabelByCodePipe } from './pipes/extract-label-by-code.pipe';
import { SidemenuItemComponent } from './components/sidemenu-item/sidemenu-item.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    IsAuthenticatedDirective,
    IsNotInRoleDirective,
    SpinnerComponent,
    ErrorsComponent,
    SidemenuComponent,
    ExtractLabelByCodePipe,
    SidemenuItemComponent,
    ImageUploaderComponent,
    ConfirmDialogComponent
  ],
    exports: [
        IsAuthenticatedDirective,
        IsNotInRoleDirective,
        SpinnerComponent,
        ErrorsComponent,
        SidemenuComponent,
        ExtractLabelByCodePipe,
        ImageUploaderComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule
  ]
})
export class SharedModule {
}

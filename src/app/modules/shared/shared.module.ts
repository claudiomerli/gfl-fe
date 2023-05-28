import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import {IsAuthenticatedDirective} from './directives/is-authenticated.directive';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {ErrorsComponent} from "./components/errors/errors.component";
import {IsNotInRoleDirective} from "./directives/is-not-in-role.directive";
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {MatDividerModule} from "@angular/material/divider";
import { ExtractLabelByCodePipe } from './pipes/extract-label-by-code.pipe';
import { SidemenuItemComponent } from './components/sidemenu-item/sidemenu-item.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import { ContentHintFormComponent } from './components/content-hint-form/content-hint-form.component';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {NgxDropzoneModule} from "ngx-dropzone";
import { PasswordShowletComponent } from './components/password-showlet/password-showlet.component';
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";

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
    ConfirmDialogComponent,
    ContentHintFormComponent,
    PasswordShowletComponent
  ],
  exports: [
    IsAuthenticatedDirective,
    IsNotInRoleDirective,
    SpinnerComponent,
    ErrorsComponent,
    SidemenuComponent,
    ExtractLabelByCodePipe,
    ImageUploaderComponent,
    ContentHintFormComponent,
    PasswordShowletComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatDialogModule,
        EditorComponent,
        NgxDropzoneModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class SharedModule {
}

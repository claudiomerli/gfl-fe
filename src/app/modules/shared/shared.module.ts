import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import {IsAuthenticatedDirective} from './directives/is-authenticated.directive';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {ErrorsComponent} from "./components/errors/errors.component";
import {IsNotInRoleDirective} from "./directives/is-not-in-role.directive";
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {ExtractLabelByCodePipe} from './pipes/extract-label-by-code.pipe';
import {SidemenuItemComponent} from './components/sidemenu-item/sidemenu-item.component';
import {ImageUploaderComponent} from './components/image-uploader/image-uploader.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ContentHintFormComponent} from './components/content-hint-form/content-hint-form.component';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {NgxDropzoneModule} from "ngx-dropzone";
import {PasswordShowletComponent} from './components/password-showlet/password-showlet.component';
import {MatInputModule} from "@angular/material/input";
import {AutoSpinnerComponent} from './components/auto-spinner/auto-spinner.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {SanitizeUrlPipe} from './pipes/sanitize-url.pipe';
import {CompactNumberPipe} from './pipes/compact-number.pipe';
import {NoDataComponent} from './components/no-data/no-data.component';
import {MatCardModule} from "@angular/material/card";
import {ChatDialogComponent} from './components/chat-dialog/chat-dialog.component';
import {ProjectAutocompleteComponent} from './components/project-autocomplete/project-autocomplete.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import { NewspaperAutocompleteComponent } from './components/newspaper-autocomplete/newspaper-autocomplete.component';
import { UserAutocompleteComponent } from './components/user-autocomplete/user-autocomplete.component';

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
    PasswordShowletComponent,
    AutoSpinnerComponent,
    SanitizeUrlPipe,
    CompactNumberPipe,
    NoDataComponent,
    ChatDialogComponent,
    ProjectAutocompleteComponent,
    NewspaperAutocompleteComponent,
    UserAutocompleteComponent
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
    PasswordShowletComponent,
    AutoSpinnerComponent,
    SanitizeUrlPipe,
    CompactNumberPipe,
    NoDataComponent,
    ProjectAutocompleteComponent,
    NewspaperAutocompleteComponent,
    UserAutocompleteComponent,
    ChatDialogComponent
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
    MatInputModule,
    NgxSpinnerModule,
    MatCardModule,
    MatAutocompleteModule,
    MatOptionModule
  ]
})
export class SharedModule {
}

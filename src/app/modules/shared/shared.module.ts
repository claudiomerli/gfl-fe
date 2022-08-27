import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {StatusLabelPipe} from './pipes/status-label.pipe';
import {RuleSatisfationIndicatorColorPipe} from './pipes/rule-satisfation-indicator-color.pipe';
import {IsAuthenticatedDirective} from './directives/is-authenticated.directive';
import {ModalComponent} from './components/modal/modal.component';
import {FileUploaderComponent} from './components/file-uploader/file-uploader.component';
import {FormsModule} from "@angular/forms";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {SortableDirective} from "./directives/sortable.directive";
import {RoleDescriptionPipe} from './pipes/role-description.pipe';
import {
  FormValidationMessagesDirective
} from "./directives/form-validation-messages/form-validation-messages.directive";
import {ErrorsComponent} from "./components/errors/errors.component";
import {IsNotInRoleDirective} from "./directives/is-not-in-role.directive";
import {ExportExcelPdfComponent} from "./components/export-excel-pdf/export-excel-pdf.component";
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import { ProjectStatusLabelPipe } from './pipes/project-status-label.pipe';
import { ExtractLabelByCodePipe } from './pipes/extract-label-by-code.pipe';
import { SidemenuItemComponent } from './components/sidemenu-item/sidemenu-item.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    StatusLabelPipe,
    RuleSatisfationIndicatorColorPipe,
    IsAuthenticatedDirective,
    IsNotInRoleDirective,
    ModalComponent,
    FileUploaderComponent,
    SpinnerComponent,
    SortableDirective,
    FormValidationMessagesDirective,
    ErrorsComponent,
    RoleDescriptionPipe,
    ExportExcelPdfComponent,
    SidemenuComponent,
    ProjectStatusLabelPipe,
    ExtractLabelByCodePipe,
    SidemenuItemComponent,
    ImageUploaderComponent,
    ConfirmDialogComponent
  ],
    exports: [
        StatusLabelPipe,
        RuleSatisfationIndicatorColorPipe,
        IsAuthenticatedDirective,
        IsNotInRoleDirective,
        ModalComponent,
        FileUploaderComponent,
        SpinnerComponent,
        SortableDirective,
        FormValidationMessagesDirective,
        ErrorsComponent,
        RoleDescriptionPipe,
        ExportExcelPdfComponent,
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

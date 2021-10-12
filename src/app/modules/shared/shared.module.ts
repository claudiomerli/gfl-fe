import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './views/header/header.component';
import {RouterModule} from "@angular/router";
import {StatusLabelPipe} from './pipes/status-label.pipe';
import {RuleSatisfationIndicatorColorPipe} from './pipes/rule-satisfation-indicator-color.pipe';
import {IsAuthenticatedDirective} from './directives/is-authenticated.directive';
import {ModalComponent} from './components/modal/modal.component';
import {FileUploaderComponent} from './components/file-uploader/file-uploader.component';
import {FormsModule} from "@angular/forms";
import {SpinnerComponent} from "./components/spinner/spinner.component";

@NgModule({
  declarations: [
    HeaderComponent,
    StatusLabelPipe,
    RuleSatisfationIndicatorColorPipe,
    IsAuthenticatedDirective,
    ModalComponent,
    FileUploaderComponent,
    SpinnerComponent
  ],
  exports: [
    HeaderComponent,
    StatusLabelPipe,
    RuleSatisfationIndicatorColorPipe,
    IsAuthenticatedDirective,
    ModalComponent,
    FileUploaderComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule {
}

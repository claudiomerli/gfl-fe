import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorListComponent } from './views/editor-list/editor-list.component';
import { EditorCreateComponent } from './views/editor-create/editor-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditorCreateFormComponent } from './components/editor-create-form/editor-create-form.component';
import {NgxPaginationModule} from "ngx-pagination";
import { EditorUpdateFormComponent } from './components/editor-update-form/editor-update-form.component';
import { EditorUpdateComponent } from './views/editor-update/editor-update.component';


@NgModule({
  declarations: [
    EditorListComponent,
    EditorCreateComponent,
    EditorCreateFormComponent,
    EditorUpdateFormComponent,
    EditorUpdateComponent
  ],
    imports: [
        CommonModule,
        EditorRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class EditorModule { }

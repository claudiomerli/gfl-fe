import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorListComponent } from './views/editor-list/editor-list.component';
import { EditorCreateComponent } from './views/editor-create/editor-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditorCreateFormComponent } from './components/editor-create-form/editor-create-form.component';


@NgModule({
  declarations: [
    EditorListComponent,
    EditorCreateComponent,
    EditorCreateFormComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditorModule { }

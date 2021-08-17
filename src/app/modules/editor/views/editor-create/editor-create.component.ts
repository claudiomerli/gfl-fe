import { Component, OnInit } from '@angular/core';
import {SaveEditorDto} from "../../../shared/messages/save-editor.dto";
import {EditorService} from "../../../shared/services/editor.service";

@Component({
  selector: 'app-editor-create',
  templateUrl: './editor-create.component.html',
  styleUrls: ['./editor-create.component.scss']
})
export class EditorCreateComponent implements OnInit {

  constructor(private editorService : EditorService) { }

  ngOnInit(): void {
  }

  onSubmit($event: SaveEditorDto) {
    this.editorService.save($event).subscribe(() => {
      console.log("Saved!")
    });
  }
}

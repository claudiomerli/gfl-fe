import {Component, OnInit} from '@angular/core';
import {SaveEditorDto} from "../../../shared/messages/editors/save-editor.dto";
import {EditorService} from "../../../shared/services/editor.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editor-create',
  templateUrl: './editor-create.component.html',
  styleUrls: ['./editor-create.component.scss']
})
export class EditorCreateComponent implements OnInit {

  onSaving = false;

  constructor(private editorService: EditorService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit($event: SaveEditorDto) {
    this.onSaving = true
    this.editorService.save($event).subscribe(() => {
      this.onSaving = false
      this.router.navigate(["/editors"])
    }, error => {
      this.onSaving = false
      console.error(error)
    });
  }
}

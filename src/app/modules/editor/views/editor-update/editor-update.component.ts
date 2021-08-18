import {Component, OnInit} from '@angular/core';
import {EditorService} from "../../../shared/services/editor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditEditorDto} from "../../../shared/messages/editors/edit-editor.dto";
import {User} from "../../../shared/model/user";

@Component({
  selector: 'app-editor-update',
  templateUrl: './editor-update.component.html',
  styleUrls: ['./editor-update.component.scss']
})
export class EditorUpdateComponent implements OnInit {

  onSaving = false;
  userToUpdate: User | undefined;

  constructor(private editorService: EditorService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute
      .paramMap
      .subscribe(params => {
        let id = params.get("id");
        if (id) {
          this.editorService.findById(parseInt(id))
            .subscribe(user => {
              this.userToUpdate = user
            })
        }
      })
  }

  onSubmit($event: EditEditorDto) {
    this.onSaving = true
    if (this.userToUpdate?.id) {
      this.editorService
        .update(this.userToUpdate?.id, $event)
        .subscribe(() => {
          this.onSaving = false
          this.router.navigate(["/editors"])
        }, error => {
          this.onSaving = false
          console.error(error)
        });
    }
  }

}

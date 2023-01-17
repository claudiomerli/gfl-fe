import {Component, OnInit, ViewChild} from '@angular/core';
import {ContentService} from "../../../shared/services/content.service";
import {ActivatedRoute} from "@angular/router";
import {Content} from "../../../shared/messages/content/content";
import {UserService} from "../../../shared/services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../shared/model/user";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatDrawer} from "@angular/material/sidenav";
import * as moment from "moment";
import {contentStatus} from "../../../shared/utils/utils";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {


  constructor(private contentService: ContentService, private activatedRoute: ActivatedRoute, private userService: UserService, private store: Store) {
  }

  @ViewChild("drawer") drawer!: MatDrawer

  contentToEdit!: Content
  editors: User[] = [];
  contentForm = new FormGroup({
    body: new FormControl<string>(""),
    editor: new FormControl<User | null | string>(null)
  })
  lastSaved?: moment.Moment

  displayFullnameEditor = (editor: User) => editor?.fullname || ""
  contentStatus = contentStatus;


  ngOnInit(): void {
    this.refresh()
  }

  public userCanEdit = () => {
    let user = this.store.selectSnapshot(AuthenticationState.user);
    switch (user?.role) {
      case "CHIEF_EDITOR":
      case "ADMIN":
        return this.contentToEdit.contentStatus != "APPROVED";
      case "EDITOR":
        return ["WORKING", "DELIVERED"].includes(this.contentToEdit.contentStatus)
      case "CUSTOMER":
        return ["SENT_TO_CUSTOMER"].includes(this.contentToEdit.contentStatus)
      default:
        return false
    }

  };

  private refresh() {
    let paramMap = this.activatedRoute.snapshot.paramMap;
    let contentId = paramMap.get("id") as any;

    this.contentService
      .findById(contentId)
      .subscribe((content) => {
        this.contentToEdit = content
        this.patchForm(content);

        this.contentForm.controls.editor.valueChanges
          .pipe(debounceTime(200))
          .subscribe((search) => {
            if (search != null && typeof search === "string" && search !== "") {
              this.userService.findForAutocomplete(search, "EDITOR",
                new PaginationDto(0, 50, "ASC", "fullname")
              ).subscribe(value => {
                this.editors = value.content
              })
            } else if (search != null && typeof search === "object") {
              this.contentService.assignToEditor(this.contentToEdit.id, search.id!).subscribe()
            } else {
              this.contentForm.controls.editor.setValue(null)
              this.editors = []
            }
          })

        this.contentForm.controls.body.valueChanges.pipe(debounceTime(2000)).subscribe(value => {
          this.contentService.updateWithNoSpinner(this.contentToEdit.id, {body: value!})
            .subscribe(() => {
              this.lastSaved = moment()
            })
        })
      })
  }


  private patchForm(content: Content) {
    this.contentForm.controls.editor.setValue(content.editor)
    this.contentForm.controls.body.setValue(content.body)
    this.lastSaved = moment(content.lastModifiedDate)
  }

  updateStatus(status: string) {
    this.contentService
      .updateStatus(this.contentToEdit.id, status)
      .subscribe(() => {
        this.refresh()
      })
  }

  exportDocx() {
    this.contentService.exportDocx(this.contentToEdit.id)
      .subscribe(value => {
        saveAs(value,`project-${this.contentToEdit.projectCommission.projectId}-commission-${this.contentToEdit.projectCommission.id}-content.docx`)
      })
  }
}

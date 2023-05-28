import {Component, OnInit, ViewChild} from '@angular/core';
import {ContentService} from "../../../shared/services/content.service";
import {ActivatedRoute} from "@angular/router";
import {Content} from "../../../shared/messages/content/content";
import {UserService} from "../../../shared/services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../shared/messages/auth/user";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatDrawer} from "@angular/material/sidenav";
import * as moment from "moment";
import {contentStatus, momentDatePatternIso} from "../../../shared/utils/utils";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {saveAs} from "file-saver";
import {MatDialog} from "@angular/material/dialog";
import {
  ContentHintDialogFormComponent
} from "../../components/content-hint-dialog-form/content-hint-dialog-form.component";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {WordpressCategory} from "../../../shared/messages/content/wordpress-category";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {


  constructor(
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private store: Store,
    private matDialog: MatDialog
  ) {
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

  publicationDate = moment()
  categories: number[] = []
  featuredMediaBase64: string | null | undefined;
  removeFeaturedMedia = false;

  wpCategories: WordpressCategory[] = [];


  ngOnInit(): void {
    this.contentForm.controls.editor.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (search != null && typeof search === "string" && search !== "") {
          this.userService.findForAutocomplete(search, "EDITOR",
            new PaginationDto(0, 10, "ASC", "fullname")
          ).subscribe(value => {
            this.editors = value.content
          })
        } else if (search === "") {
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

    this.refresh()
  }

  public userCanEdit = () => {
    let user = this.store.selectSnapshot(AuthenticationState.user);
    switch (user?.role) {
      case "INTERNAL_NETWORK":
      case "CHIEF_EDITOR":
      case "ADMIN":
        return true;
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
        this.featuredMediaBase64 = null
        if (this.contentToEdit.isDomainContent) {
          this.contentService.getWordpressCategory(this.contentToEdit.id)
            .subscribe(value => {
              this.wpCategories = value;
            })
        }

        this.patchForm(content);
      })
  }


  private patchForm(content: Content) {
    this.categories = content.wordpressCategories.map(value => value.categoryId);
    this.publicationDate = content.wordpressPublicationDate ? moment(content.wordpressPublicationDate) : moment()
    this.contentForm.controls.editor.setValue(content.editor)
    this.contentForm.controls.body.setValue(content.body)
    this.lastSaved = moment(content.lastModifiedDate)
  }

  updateStatus(status: string) {
    this.contentService.updateWithNoSpinner(this.contentToEdit.id, {body: this.contentForm.controls.body.value!})
      .subscribe(() => {
        this.lastSaved = moment()
        this.contentService
          .updateStatus(this.contentToEdit.id, status)
          .subscribe(() => {
            this.refresh()
          })
      })
  }

  exportDocx() {
    this.contentService.exportDocx(this.contentToEdit.id)
      .subscribe(value => {
        saveAs(value, `project-${this.contentToEdit.projectCommission.projectId}-commission-${this.contentToEdit.projectCommission.id}-content.docx`)
      })
  }

  openDialogContentHint() {
    this.matDialog.open(ContentHintDialogFormComponent, {
      data: this.contentToEdit.id
    })
      .afterClosed()
      .subscribe(() => this.refresh())
  }

  publishOnWordpress() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di voler pubblicare il contenuto su Wordpress? Le modifiche fatte su questa piattaforma sovrascriveranno quelle di Wordpress!"
    }).afterClosed().subscribe(answer => {
      if (answer) {
        this.contentService
          .publishOnWordpress(this.contentToEdit.id, {
            publishDate: this.publicationDate.format(momentDatePatternIso),
            categories: this.categories,
            featuredMediaBase64: this.featuredMediaBase64 || null,
            removeFeaturedMedia: this.removeFeaturedMedia
          })
          .subscribe(() => {
            this.refresh()
          })
      }
    })
  }

  assignEditor($event: MatAutocompleteSelectedEvent) {
    this.contentService.assignToEditor(this.contentToEdit.id, $event.option.value.id!).subscribe()
  }

  onFeaturedMediaChange($event: NgxDropzoneChangeEvent) {
    // @ts-ignore
    let file = $event.addedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.featuredMediaBase64 = reader.result as string;
      this.removeFeaturedMedia = false;
    };
    reader.readAsDataURL(file);
  };

  removeFeaturedImage() {
    this.featuredMediaBase64 = null;
    this.removeFeaturedMedia = true
  }
}

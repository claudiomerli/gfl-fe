import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Project, ProjectCommission} from "../../../shared/messages/project/project";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {debounceTime, throttle} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {SaveProjectCommissionDto} from "../../../shared/messages/project/save-project-commission.dto";
import {
  contentTypes,
  getYearList,
  momentDatePatternIso,
  periods,
  ProjectCommissionStatus,
  validateObject
} from "../../../shared/utils/utils";
import {Select, Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {Observable} from "rxjs";
import {Moment} from "moment/moment";
import * as moment from "moment";
import {ProjectService} from "../../../shared/services/project.service";
import {
  SelectContentPurchaseDialogComponent
} from "../select-content-purchase-dialog/select-content-purchase-dialog.component";
import {PurchaseContent} from "../../../shared/messages/purchase-content/purchase-content";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-project-commission-form',
  templateUrl: './project-commission-form.component.html',
  styleUrls: ['./project-commission-form.component.scss']
})
export class ProjectCommissionFormComponent implements OnInit {

  projectCommissionForm = this.createFormGroup();

  @Input() preselectedNewspaper!: number
  @Input() readonlyNewspaper!: number
  @Input() projectCommission!: ProjectCommission;
  @Input() project!: Project;

  @Output() save = new EventEmitter<SaveProjectCommissionDto>()
  @Output() delete = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
  @Output() changeStatus = new EventEmitter<string>()

  constructor(private newspaperService: NewspaperService, private projectService: ProjectService, private store: Store, private matDialog: MatDialog) {
  }

  createFormGroup() {
    return new FormGroup({
      newspaper: new FormControl<Newspaper | null>(null, [validateObject]),
      period: new FormControl(''),
      year: new FormControl<number | null>(null),
      anchor: new FormControl(''),
      isAnchorBold: new FormControl(false),
      isAnchorItalic: new FormControl(false),
      url: new FormControl(''),
      title: new FormControl(''),
      notes: new FormControl(''),
      publicationUrl: new FormControl(''),
      publicationDate: new FormControl<Moment | null>(null),
      hintBody: new FormControl<string | null>(null),
      deliveryDate: new FormControl<string | null>(null),
      contentType: new FormControl<string | null>(null),
      publicationWorkNotes: new FormControl<string | null>(null),
      contentWorkNotes: new FormControl<string | null>(null),
    })
  }

  ngOnInit(): void {
    if (this.projectCommission) {
      console.log(this.projectCommission)
      this.projectCommissionForm.patchValue({
        newspaper: this.projectCommission.newspaper,
        anchor: this.projectCommission.anchor,
        isAnchorBold: this.projectCommission.isAnchorBold,
        isAnchorItalic: this.projectCommission.isAnchorItalic,
        notes: this.projectCommission.notes,
        period: this.projectCommission.period,
        year: this.projectCommission.year,
        url: this.projectCommission.url,
        publicationUrl: this.projectCommission.publicationUrl,
        publicationDate: this.projectCommission.publicationDate ? moment(this.projectCommission.publicationDate, momentDatePatternIso) : null,
        title: this.projectCommission.title,
        contentType: this.projectCommission.contentType,
        deliveryDate: this.projectCommission.deliveryDate,
        publicationWorkNotes: this.projectCommission.publicationWorkNotes,
        contentWorkNotes: this.projectCommission.contentWorkNotes
      })
      this.newspaperInput.setValue(this.projectCommission.newspaper)
      this.nextSteps = this.projectService.getNextCommissionStepByActualStatusCode(this.projectCommission.status, this.project.isDomainProject ? "DOMAIN" : "REGULAR")
    }

    if (this.readonlyNewspaper) {
      this.newspaperService
        .findById(this.readonlyNewspaper)
        .subscribe(newspaper => {
          this.projectCommissionForm.controls.newspaper.setValue(newspaper)
          this.newspaperInput.setValue(newspaper)
        })
    } else if (this.preselectedNewspaper) {
      this.newspaperService
        .findById(this.preselectedNewspaper)
        .subscribe(newspaper => {
          this.projectCommissionForm.controls.newspaper.setValue(newspaper)
          this.newspaperInput.setValue(newspaper)
        })
    }

    this.newspaperInput.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (search !== "") {
          this.newspaperService.findForAutocomplete({
              name: search
            }, new PaginationDto(0, 10, "ASC", "name")
          ).subscribe(value => {
            this.newspaper = value.content
          })
        } else {
          this.projectCommissionForm.controls.newspaper.setValue(null)
          this.newspaper = []
        }
      })
  }


  newspaper: Newspaper[] = [];
  displayNewspaperName: (newspaper: Newspaper) => string = (newspaper) => newspaper?.name
  newspaperInput: FormControl = new FormControl<string>("");

  newspaperOptionSelected($event: MatAutocompleteSelectedEvent) {
    this.projectCommissionForm.controls.newspaper.setValue($event.option.value)
  }

  onSave() {
    if (this.projectCommissionForm.valid) {
      this.save.emit(this.buildDto());
    }
  }

  onDelete() {
    this.delete.emit()
  }

  onCancel() {
    this.cancel.emit()
  }


  buildDto(): SaveProjectCommissionDto {
    let value = this.projectCommissionForm.value;
    return {
      anchor: value.anchor!,
      isAnchorBold: value.isAnchorBold!,
      isAnchorItalic: value.isAnchorItalic!,
      url: value.url!,
      publicationUrl: value.publicationUrl!,
      publicationDate: value.publicationDate?.format(momentDatePatternIso)!,
      title: value.title!,
      notes: value.notes!,
      period: value.period!,
      year: value.year!,
      newspaperId: value.newspaper?.id!,
      contentType: value.contentType!,
      contentWorkNotes: value.contentWorkNotes!,
      publicationWorkNotes: value.publicationWorkNotes!,
      deliveryDate: value.deliveryDate!
    }
  }

  @ViewChild("formGroupDirective")
  formGroupDirective!: NgForm;
  periods = periods;
  contentTypes = contentTypes;
  years = getYearList();
  nextSteps: ProjectCommissionStatus[] = [];

  onChangeStatus(status: string) {
    this.changeStatus.emit(status)
  }

  isRoleAllowedToChangeCommonField() {
    let user = this.store.selectSnapshot(AuthenticationState.user);
    return user?.role === "ADMIN" || user?.role === "CHIEF_EDITOR" || user?.role === "PUBLISHER" || user?.role === "INTERNAL_NETWORK";
  }

  isRoleAllowedToChangePublicationFields() {
    let user = this.store.selectSnapshot(AuthenticationState.user);
    return this.isRoleAllowedToChangeCommonField() || (user?.role === "PUBLISHER" && [
      'TO_PUBLISH',
      'SENT_TO_NEWSPAPER',
      'STANDBY_PUBLICATION',
      'SENT_TO_ADMINISTRATION' //Richiesta del 25 Aprile 2025 "Abilitare il PUBBLICATORE a poter modificare il link di una commissione anche se già inviata in amministrazione"
    ].includes(this.projectCommission.status));
  }

  isRoleAllowedToSave() {
    return this.isRoleAllowedToChangeCommonField() || this.isRoleAllowedToChangePublicationFields()
  }

  canShowSentToAdministration() {
    return this.projectService.getNextCommissionStepCodesByActualStatusCode(this.projectCommission.status, this.project.isDomainProject ? "DOMAIN" : "REGULAR", true).includes("SENT_TO_ADMINISTRATION");
  }

  openSelectPurchaseContentDialog() {
    this.matDialog.open(SelectContentPurchaseDialogComponent, {
      data: this.projectCommission.newspaper.id
    })
      .afterClosed()
      .subscribe((value: PurchaseContent | null) => {
        if (value) {
          this.projectService.updateCommissionStatus(this.project.id, this.projectCommission.id, "SENT_TO_ADMINISTRATION", {
            contentPurchasedId: value.id
          }).subscribe(() => {
            this.onSave()
          })
        }
      })
  }

}

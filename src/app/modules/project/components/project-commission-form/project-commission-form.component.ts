import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProjectCommission} from "../../../shared/model/project";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Newspaper} from "../../../shared/model/newspaper";
import {debounceTime} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {SaveProjectCommissionDto} from "../../../shared/messages/project/save-project-commission.dto";
import {getYearList, momentDatePatternIso, periods, validateObject} from "../../../shared/utils/utils";
import {Select, Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {Observable} from "rxjs";
import {Moment} from "moment/moment";
import * as moment from "moment";

@Component({
  selector: 'app-project-commission-form',
  templateUrl: './project-commission-form.component.html',
  styleUrls: ['./project-commission-form.component.scss']
})
export class ProjectCommissionFormComponent implements OnInit {

  projectCommissionForm = this.createFormGroup();

  @Select(AuthenticationState.isUserInRole("ADMIN"))
  isUserAdmin$!: Observable<boolean>;
  @Select(AuthenticationState.isUserInRole("PUBLISHER"))
  isUserPublisher$!: Observable<boolean>;
  @Select(AuthenticationState.isUserInRole("CHIEF_EDITOR"))
  isUserChiefEditor$!: Observable<boolean>;

  constructor(private newspaperService: NewspaperService, private store: Store) {
  }

  createFormGroup() {
    return new FormGroup({
      newspaper: new FormControl<Newspaper | null>(null, [validateObject]),
      period: new FormControl(''),
      year: new FormControl<number | null>(null),
      anchor: new FormControl(''),
      url: new FormControl(''),
      title: new FormControl(''),
      notes: new FormControl(''),
      publicationUrl: new FormControl(''),
      publicationDate: new FormControl<Moment | null>(null),
    })
  }

  ngOnInit(): void {
    if (this.projectCommission) {
      this.projectCommissionForm.patchValue({
        newspaper: this.projectCommission.newspaper,
        anchor: this.projectCommission.anchor,
        notes: this.projectCommission.notes,
        period: this.projectCommission.period,
        year: this.projectCommission.year,
        url: this.projectCommission.url,
        publicationUrl: this.projectCommission.publicationUrl,
        publicationDate: moment(this.projectCommission.publicationDate, momentDatePatternIso),
        title: this.projectCommission.title
      })
      this.newspaperInput.setValue(this.projectCommission.newspaper)
    }

    this.newspaperInput.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (search !== "") {
          this.newspaperService.findForAutocomplete({
              name: search
            }, new PaginationDto(0, 50, "ASC", "name")
          ).subscribe(value => {
            this.newspaper = value.content
          })
        } else {
          this.projectCommissionForm.controls.newspaper.setValue(null)
          this.newspaper = []
        }
      })
  }

  @Input() projectCommission!: ProjectCommission;
  @Output() save = new EventEmitter<SaveProjectCommissionDto>()
  @Output() delete = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
  @Output() changeStatus = new EventEmitter<string>()


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
      url: value.url!,
      publicationUrl: value.publicationUrl!,
      publicationDate: value.publicationDate?.format(momentDatePatternIso)!,
      title: value.title!,
      notes: value.notes!,
      period: value.period!,
      year: value.year!,
      newspaperId: value.newspaper?.id!
    }
  }

  @ViewChild("formGroupDirective")
  formGroupDirective!: NgForm;
  periods = periods;
  years = getYearList();

  onChangeStatus(status: string) {
    this.changeStatus.emit(status)
  }

  isRoleAllowedToChangeCommonField() {
    let user = this.store.selectSnapshot(AuthenticationState.user);
    if (user?.role === "ADMIN") {
      return true
    }
    if (user?.role === "CHIEF_EDITOR" && (!this.projectCommission || ['CREATED', 'STARTED', 'ASSIGNED', 'STANDBY_EDITORIAL'].includes(this.projectCommission.status))) {
      return true
    }

    return false;
  }

  isRoleAllowedToChangePublicationUrl() {
    let user = this.store.selectSnapshot(AuthenticationState.user);
    if (this.isRoleAllowedToChangeCommonField()) {
      return true
    }

    if (user?.role === "PUBLISHER" && ['TO_PUBLISH', 'SENT_TO_NEWSPAPER', 'STANDBY_PUBLICATION'].includes(this.projectCommission.status)) {
      return true
    }

    return false
  }

  isRoleAllowedToChangePublicationDate() {
    let user = this.store.selectSnapshot(AuthenticationState.user);
    if (this.isRoleAllowedToChangeCommonField()) {
      return true
    }

    if ((user?.role === "PUBLISHER" || user?.role === "CHIEF_EDITOR") && ['TO_PUBLISH', 'SENT_TO_NEWSPAPER', 'STANDBY_PUBLICATION'].includes(this.projectCommission.status)) {
      return true
    }

    return false
  }

  isRoleAllowedToSave() {
    return this.isRoleAllowedToChangeCommonField() || this.isRoleAllowedToChangePublicationUrl() || this.isRoleAllowedToChangePublicationDate()
  }
}

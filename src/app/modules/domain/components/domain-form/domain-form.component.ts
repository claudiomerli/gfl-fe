import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SaveDomainDto} from "../../../shared/messages/domain/save-domain.dto";
import {Domain} from "../../../shared/messages/domain/domain";
import * as moment from "moment";
import {momentDatePatternIso, validateObject} from "../../../shared/utils/utils";
import {Hosting} from "../../../shared/messages/hosting/hosting";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {HostingService} from "../../../shared/services/hosting.service";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {NewspaperService} from "../../../shared/services/newspaper.service";

@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.scss']
})
export class DomainFormComponent implements OnInit, OnChanges {

  constructor(private hostingService: HostingService, private newspaperService: NewspaperService) {
  }

  @Output() formSubmit = new EventEmitter<SaveDomainDto>();
  @Input() domainToEdit!: Domain;

  domainForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/)]),
    ip: new FormControl(""),
    wordpressUsername: new FormControl(""),
    wordpressPassword: new FormControl(""),
    expiration: new FormControl<moment.Moment | null>(null),
    hosting: new FormControl<Hosting | null | string>(null, [Validators.required, validateObject]),
    newspaper: new FormControl<Newspaper | null | string>(null, [Validators.required, validateObject])
  })

  displayNameHosting = (editor: Hosting) => editor?.name || ""
  hosting: Hosting[] = [];

  displayNameNewspaper = (editor: Newspaper) => editor?.name || ""
  newspapers: Newspaper[] = [];

  wordpressPasswordHide = true

  ngOnInit(): void {
    this.domainForm.controls.hosting.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (search != null && typeof search === "string" && search !== "") {
          this.hostingService
            .findForAutocomplete(search, new PaginationDto(0, 50, "ASC", "name"))
            .subscribe(value => {
              this.hosting = value.content
            })
        } else if (search === "") {
          this.domainForm.controls.hosting.setValue(null)
          this.hosting = []
        }
      })

    this.domainForm.controls.newspaper.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (search != null && typeof search === "string" && search !== "") {
          this.newspaperService.findForAutocomplete({name: search}, new PaginationDto(0, 50, "ASC", "name")
          ).subscribe(value => {
            this.newspapers = value.content
          })
        } else if (search === "") {
          this.domainForm.controls.newspaper.setValue(null)
          this.newspapers = []
        }
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.domainToEdit.currentValue) {
      this.domainForm.patchValue({
        name: this.domainToEdit.name!,
        ip: this.domainToEdit.ip!,
        wordpressUsername: this.domainToEdit.wordpressUsername!,
        wordpressPassword: this.domainToEdit.wordpressPassword!,
        expiration: this.domainToEdit.expiration ? moment(this.domainToEdit.expiration!) : null,
        hosting: this.domainToEdit.hosting,
        newspaper: this.domainToEdit.newspaper
      })
    }
  }

  onSubmit() {
    if (this.domainForm.valid) {
      this.formSubmit.emit({
        name: this.domainForm.value.name!,
        ip: this.domainForm.value.ip!,
        wordpressUsername: this.domainForm.value.wordpressUsername!,
        wordpressPassword: this.domainForm.value.wordpressPassword!,
        expiration: this.domainForm.value.expiration?.format(momentDatePatternIso)!,
        hostingId: (this.domainForm.value.hosting as Hosting).id,
        newspaperId: (this.domainForm.value.newspaper as Newspaper).id
      })
    }
  }
}

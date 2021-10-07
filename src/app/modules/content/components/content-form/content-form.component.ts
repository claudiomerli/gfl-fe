import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, zip} from "rxjs";
import {User} from "../../../shared/model/user";
import {Customer} from "../../../shared/model/customer";
import {Newspaper} from "../../../shared/model/newspaper";
import {CustomerService} from "../../../shared/services/customer.service";
import {EditorService} from "../../../shared/services/editor.service";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {ContentRules} from "../../../shared/model/content-rules";
import {Content} from "../../../shared/model/content";

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit, OnChanges {

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private editorService: EditorService, private newspaperService: NewspaperService) {
  }

  @Input()
  contentToUpdate: Content | undefined;

  @Input()
  onEdit: boolean | undefined;

  @Output() submitForm = new EventEmitter<any>();
  @Output() exportDocx = new EventEmitter<any>();
  @Output() exportPdf = new EventEmitter<any>();
  @Output() deliver = new EventEmitter<any>();


  editor$ = new BehaviorSubject<User[]>([])
  customer$ = new BehaviorSubject<Customer[]>([])
  newspaper$ = new BehaviorSubject<Newspaper[]>([])

  customerContentRules: ContentRules | undefined;

  contentRulesAttachment: any

  contentForm = this.formBuilder.group({
    editorId: [null, Validators.required],
    customerId: [null, Validators.required],
    newspaperId: [null, Validators.required],
    contentRules: this.formBuilder.group({
      title: [null],
      linkUrl: [null],
      linkText: [null],
      body: [null],
      maxCharacterBodyLength: [null],
      attachmentFileName: [null],
      attachmentContentType: [null],
      attachmentBase64: [null]
    }),
    adminNotes: [null],
    title: [null],
    linkText: [null],
    linkUrl: [null],
    body: [null],
    deliveryDate: [null, Validators.required],
    contentStatus: [null],
    score: [null],
    monthUse: [null]
  });


  ngOnInit(): void {

    zip(
      this.customerService.find("", PaginationDto.buildMaxValueOnePage()),
      this.editorService.find("", PaginationDto.buildMaxValueOnePage()),
      this.newspaperService.find("", PaginationDto.buildMaxValueOnePage())
    ).subscribe(results => {
      this.customer$.next(results[0].content)
      this.editor$.next(results[1].content)
      this.newspaper$.next(results[2].content)

      this.contentForm.controls.customerId.valueChanges.subscribe(actualValue => {
        if (actualValue) {
          this.customerContentRules = this.customer$.getValue().find(customer => customer.id = actualValue)?.contentRules
        } else {
          this.customerContentRules = undefined
        }
      })

      this.patchValueToForm(this.contentToUpdate as Content)
    })
  }

  onSubmit() {
    this.submitForm.emit(this.contentForm.value)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.contentToUpdate.isFirstChange())
      this.patchValueToForm(changes.contentToUpdate?.currentValue as Content)
  }

  patchValueToForm(content: Content) {
    if (content) {
      console.log(content.customer)
      this.contentForm.patchValue({
        editorId: content.editor?.id,
        customerId: content.customer?.id,
        newspaperId: content.newspaper?.id,
        contentRules: {
          ...content.contentRules,
          attachmentFileName : content.contentRules?.attachment?.filename,
          attachmentContentType: content.contentRules?.attachment?.contentType,
        },
        title: content.title,
        linkUrl: content.linkUrl,
        linkText: content.linkText,
        body: content.body,
        deliveryDate: content.deliveryDate,
        contentStatus: content.contentStatus,
        score: content.score,
        monthUse: content.monthUse,
      })

      this.contentRulesAttachment = content.contentRules?.attachment
    }
  }

  copyCustomerLink() {
    navigator.clipboard.writeText(window.location.origin + "/reserved/content/" + this.contentToUpdate?.id + "?contentToken=" + this.contentToUpdate?.customerToken)
  }

  onLoadFile($event: { filename: string; contentType: string; byte: any }) {
    this.contentForm.controls.contentRules.patchValue({
      attachmentFileName: $event.filename,
      attachmentContentType: $event.contentType,
      attachmentBase64: $event.byte
    })
  }

  onRemoveFile() {
    this.contentForm.controls.contentRules.patchValue({
      attachmentFileName: undefined,
      attachmentContentType: undefined,
      attachmentBase64: undefined
    })
  }
}

import {BehaviorSubject, interval, Subscription, zip} from "rxjs";
import {User} from "../../../shared/model/user";
import {Customer} from "../../../shared/model/customer";
import {Newspaper} from "../../../shared/model/newspaper";
import {CustomerService} from "../../../shared/services/customer.service";
import {UserService} from "../../../shared/services/user.service";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {ContentRules} from "../../../shared/model/content-rules";
import {Content, ContentLink} from "../../../shared/model/content";
import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from "@angular/core";
import {UntypedFormArray, UntypedFormBuilder, Validators} from "@angular/forms";
import {Project} from "../../../shared/model/project";
import {ProjectService} from "../../../shared/services/project.service";
import {filter} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

export interface ContentSaveEvent {
  id?: number;
  value: any;
  noSendEmail: boolean;
}

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private customerService: CustomerService,
    private userService: UserService,
    private newspaperService: NewspaperService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  @Input()
  contentToUpdate: Content | undefined;

  @Input()
  onEdit: boolean | undefined;

  @Input()
  id?: number;

  @Output() submitForm = new EventEmitter<ContentSaveEvent>();
  @Output() autoSave = new EventEmitter<ContentSaveEvent>();
  @Output() exportDocx = new EventEmitter<any>();
  @Output() exportPdf = new EventEmitter<any>();
  @Output() deliver = new EventEmitter<any>();
  @Output() changeProjectStatus = new EventEmitter<Content>();

  customers$ = new BehaviorSubject<Customer[]>([])
  editor$ = new BehaviorSubject<User[]>([])
  newspaper$ = new BehaviorSubject<Newspaper[]>([])
  projects$ = new BehaviorSubject<Project[]>([])

  customerContentRules: ContentRules | undefined;

  contentRulesAttachment: any

  contentForm = this.formBuilder.group({
    editorId: [null, Validators.required],
    customerId: [null, Validators.required],
    projectId: [null, Validators.required],
    newspaperId: [null, Validators.required],
    contentRules: this.formBuilder.group({
      title: [null],
      linkUrl: [null],
      linkText: [null],
      body: [null],
      links: this.formBuilder.array([]),
      maxCharacterBodyLength: [null],
      attachmentFileName: [null],
      attachmentContentType: [null],
      attachmentBase64: [null]
    }),
    adminNotes: [null],
    title: [null],
    links: this.formBuilder.array([]),
    body: [null],
    deliveryDate: [null, Validators.required],
    contentStatus: [null],
    score: [null],
    monthUse: [null],
    projectContentPreviewId: [null]
  });

  private inteval = 1000 * 60; // 1 minuto
  private intervalSubscription?: Subscription;

  get links() {
    return this.contentForm.get('links') as UntypedFormArray;
  }

  get contentRuleLinks() {
    return this.contentForm.controls.contentRules.get('links') as UntypedFormArray;
  }

  ngOnInit(): void {
    zip(
      this.customerService.find("", PaginationDto.buildMaxValueOnePage()),
      this.userService.find("", '', PaginationDto.buildMaxValueOnePage()),
      this.newspaperService.find({}, PaginationDto.buildMaxValueOnePage()),
      // this.projectService.find("", "" ,PaginationDto.buildMaxValueOnePage())
    ).subscribe(results => {
      this.customers$.next(results[0].content)
      this.editor$.next(results[1].content)
      this.newspaper$.next(results[2].content)
      // this.projects$.next(results[3].content)

      this.contentForm.controls.customerId.valueChanges.subscribe(actualValue => {
        if (actualValue) {
          this.customerContentRules = this.customers$.getValue().find(customer => customer.id === actualValue)?.contentRules
        } else {
          this.customerContentRules = undefined
        }
      })
      let previewId = this.activatedRoute.snapshot.queryParamMap.get('previewId');
      // if(previewId) {
      //   this.projectService.getContentPreview(previewId).subscribe(contentPreview => {
      //
      //     this.patchValueToFormFromPreview(contentPreview);
      //
      //   });
      // }


      this.patchValueToForm(this.contentToUpdate as Content)
    });

    this.contentForm.controls.projectId.valueChanges.subscribe(actualValue => {
      let selectedProject = this.projects$.getValue().find(value => value.id === actualValue);
      if (selectedProject) {
        this.contentForm.controls.customerId.setValue(selectedProject.customer?.id);
        this.contentForm.controls.customerId.disable()
      } else {
        this.contentForm.controls.customerId.setValue(null);
        this.contentForm.controls.customerId.enable()
      }
    })

    this.intervalSubscription = interval(this.inteval)
      .pipe(
        filter(() => this.contentForm.valid)
      )
      .subscribe(() => this.autoSave.emit({
        id: this.id,
        value: this.contentForm.getRawValue(),
        noSendEmail: true
      }));
  }

  ngOnDestroy() {
    this.intervalSubscription?.unsubscribe()
  }

  onSubmit() {
    this.submitForm.emit({
      id: this.id,
      value: this.contentForm.getRawValue(),
      noSendEmail: false
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.contentToUpdate?.isFirstChange())
      this.patchValueToForm(changes.contentToUpdate?.currentValue as Content)
  }

  patchValueToForm(content: Content) {
    if (content) {
      this.contentForm.patchValue({
        editorId: content.editor?.id,
        customerId: content.customer?.id,
        newspaperId: content.newspaper?.id,
        projectId: content.project?.id,
        contentRules: {
          ...content.contentRules,
          attachmentFileName: content.contentRules?.attachment?.filename,
          attachmentContentType: content.contentRules?.attachment?.contentType,
        },
        title: content.title,
        body: content.body,
        deliveryDate: content.deliveryDate,
        contentStatus: content.contentStatus,
        score: content.score,
        monthUse: content.monthUse,
      })


      this.contentRulesAttachment = content.contentRules?.attachment

      this.contentRuleLinks.clear()
      content.contentRules?.links?.forEach(link => {
        this.contentRuleLinks.push(
          this.formBuilder.group({
            linkUrl: link.linkUrl,
          })
        );
      });

      this.links.clear()
      content.links?.forEach(link => {
        this.links.push(
          this.formBuilder.group({
            linkText: link.linkText,
            linkUrl: link.linkUrl,
          })
        );
      });
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

  addLink() {
    this.links.push(
      this.formBuilder.group({
        linkText: [null],
        linkUrl: [null],
      })
    );
  }

  removeLink(idx: number) {
    this.links.removeAt(idx)
  }

  addContentRuleLink() {
    this.contentRuleLinks.push(
      this.formBuilder.group({
        linkText: [null],
        linkUrl: [null],
      })
    );
  }

  removeContentRuleLink(idx: number) {
    this.contentRuleLinks.removeAt(idx)
  }
}

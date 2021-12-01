import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {Project, ProjectContentPreview, ProjectStatus} from "../../../shared/model/project";
import {ModalComponent, ModalSize} from "../../../shared/components/modal/modal.component";
import {ContentMonthUse} from "../../../shared/model/content";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/model/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {ProjectService} from "../../../shared/services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {

  @Input() actualPageValue: PageResponseDto<Project> = new PageResponseDto<Project>();
  @Input() showDeleteButton = true
  @Input() showEditButton = true
  @Input() showChangeStatusButton = true
  @Input() availableStatusProject: ProjectStatus[] = []

  @Output() delete = new EventEmitter<Project>();
  @Output() changeStatus = new EventEmitter<Project>();
  @Output() pageChange = new EventEmitter<any>();
  @ViewChild('modal')
  modal?: ModalComponent;
  @ViewChild('modalAssegnazione')
  modalAssegnazione?: ModalComponent;
  modalSizeXL = ModalSize.XL
  modalSizeSM = ModalSize.SM
  selectedProject?: Project;
  contents : ProjectContentPreview[] | undefined = Array<ProjectContentPreview>();
  listUtenti : Array<User>| undefined = Array<User>();
  assegnazioneForm: FormGroup = this.initAssegnazioneForm();
  assegnazioneFormSubmitted: boolean = false;


  constructor(private userService: UserService,
              private projectService: ProjectService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  initAssegnazioneForm(): FormGroup {
    return this.fb.group({
      projectId: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  get userIdControl(): FormControl {
    return this.assegnazioneForm.controls.userId as FormControl;
  }

  isInAvailableStatus(project: Project): boolean {
    return this.availableStatusProject.includes(project.status);
  }

  apriDettaglioProgetto(project: Project) {
    this.contents = project.projectContentPreviews;
    this.selectedProject = project;
    if (this.modal) {
      this.modal.open(`Progetto: ${this.selectedProject.name}`);
    }
  }

  assegnaProgetto(project?: Project) {
    this.assegnazioneForm.patchValue({projectId: project?.id});
    if (this.modalAssegnazione) {
      this.userService.find('', 'CHIEF_EDITOR', new PaginationDto(0, undefined ,undefined , undefined )).subscribe(data => {
        this.listUtenti = data.content;
        this.modalAssegnazione?.open(`Assegna il progetto: ${project?.name}`);
      });
    }
  }

  decodeMonth(monthUse?: string): string {
    return ContentMonthUse[monthUse as keyof typeof ContentMonthUse]
  }

  assegna() {
    this.assegnazioneFormSubmitted = true;
    if(this.assegnazioneForm?.valid) {
      this.projectService.assegnaCapoRedattore(this.assegnazioneForm.value.projectId, this.assegnazioneForm.value.userId).subscribe(res => this.modalAssegnazione?.close());
    }
  }

  ripulisciFormAssegnazione() {
    this.assegnazioneFormSubmitted = false;
    this.assegnazioneForm = this.initAssegnazioneForm();
  }

  gestisciRedazionale(item: ProjectContentPreview) {

    if(item.contentId) {

    } else {
      this.router.navigate(["/contents/create"], {queryParams: {previewId: item.id}});
    }


  }
}

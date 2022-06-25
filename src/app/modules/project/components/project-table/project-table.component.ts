import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {Project, ProjectContentPreview, ProjectStatus} from "../../../shared/model/project";
import {ModalComponent, ModalSize} from "../../../shared/components/modal/modal.component";
import {ContentMonthUse} from "../../../shared/model/content";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/model/user";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {ProjectService} from "../../../shared/services/project.service";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {

  displayedColumns: string[] = []

  @Input() actualPage: PageResponseDto<Project> = new PageResponseDto<Project>();
  @Input() actualPaginationRequest!: PaginationDto;

  @Input() showDeleteButton = true
  @Input() showEditButton = true
  @Input() showChangeStatusButton = true
  @Input() availableStatusProject: ProjectStatus[] = []

  @Output() delete = new EventEmitter<Project>();
  @Output() changeStatus = new EventEmitter<Project>();
  @Output() pageChange = new EventEmitter<void>();

  @ViewChild('modal')
  modal?: ModalComponent;

  @ViewChild('modalAssegnazione')
  modalAssegnazione?: ModalComponent;

  modalSizeXL = ModalSize.XL
  modalSizeSM = ModalSize.SM

  selectedProject?: Project;
  contents: ProjectContentPreview[] | undefined = Array<ProjectContentPreview>();

  listUtenti: Array<User> | undefined = Array<User>();
  assegnazioneForm: UntypedFormGroup = this.initAssegnazioneForm();
  assegnazioneFormSubmitted: boolean = false;


  constructor(private userService: UserService,
              private projectService: ProjectService,
              private fb: UntypedFormBuilder,
              private router: Router,
              private store: Store,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.buildColumns()
  }

  buildColumns() {
    let currentUser = this.store.selectSnapshot(AuthenticationState.user);
    this.displayedColumns = ['id', 'name', 'customer.name', 'status']
    if (currentUser?.role && ['CHIEF_EDITOR', 'ADMIN'].includes(currentUser?.role)) {
      this.displayedColumns.push(`chiefEditor`)
    }
    this.displayedColumns.push('actions')
  }

  initAssegnazioneForm(): UntypedFormGroup {
    return this.fb.group({
      projectId: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  get userIdControl(): UntypedFormControl {
    return this.assegnazioneForm.controls.userId as UntypedFormControl;
  }

  isInAvailableStatus(project: Project): boolean {
    return this.availableStatusProject.includes(project.status);
  }

  apriDettaglioProgetto(project: Project) {
    const dialogRef = this.dialog.open(ProjectDetailDialog, {
      width: '800px',
      data: project,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  assegnaProgetto(project?: Project) {
    this.assegnazioneForm.patchValue({projectId: project?.id});
    if (this.modalAssegnazione) {
      this.userService.find('', 'CHIEF_EDITOR', new PaginationDto(0, undefined, undefined, undefined)).subscribe(data => {
        this.listUtenti = data.content;
        this.modalAssegnazione?.open(`Assegna il progetto: ${project?.name}`);
      });
    }
  }

  assegna() {
    this.assegnazioneFormSubmitted = true;
    if (this.assegnazioneForm?.valid) {
      this.projectService.assegnaCapoRedattore(this.assegnazioneForm.value.projectId, this.assegnazioneForm.value.userId).subscribe(res => this.modalAssegnazione?.close());
    }
  }

  ripulisciFormAssegnazione() {
    this.assegnazioneFormSubmitted = false;
    this.assegnazioneForm = this.initAssegnazioneForm();
  }


  onPageChange($event: PageEvent) {
    this.actualPaginationRequest.page = $event.pageIndex;
    this.actualPaginationRequest.pageSize = $event.pageSize;
    this.pageChange.emit()
  }

  onSortChange($event: Sort) {
    this.actualPaginationRequest.sortBy = $event.active
    this.actualPaginationRequest.sortDirection = $event.direction.toUpperCase()
    this.pageChange.emit()
  }
}

@Component({
  selector: 'project-detail-dialog',
  templateUrl: 'project-detail-dialog.html',
})
export class ProjectDetailDialog {
  constructor(
    public dialogRef: MatDialogRef<ProjectDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    public router: Router
  ) {
  }

  gestisciRedazionale(item: ProjectContentPreview) {
    if (item.contentId) {

    } else {
      this.router.navigate(["/contents/create"], {queryParams: {previewId: item.id}});
    }
  }

  decodeMonth(monthUse?: string): string {
    return ContentMonthUse[monthUse as keyof typeof ContentMonthUse]
  }

}

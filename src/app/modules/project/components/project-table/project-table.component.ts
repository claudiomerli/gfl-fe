import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {Project, ProjectContentPreview, ProjectStatus} from "../../../shared/model/project";
import {ModalComponent, ModalSize} from "../../../shared/components/modal/modal.component";
import {ProjectService} from "../../../shared/services/project.service";
import {ContentMonthUse} from "../../../shared/model/content";

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
  modalSize = ModalSize.XL
  selectedProject?: Project;
  contents : ProjectContentPreview[] | undefined = Array<ProjectContentPreview>();

  isInAvailableStatus(project: Project): boolean {
    return this.availableStatusProject.includes(project.status);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  apriDettaglioProgetto(project: Project) {
    this.contents = project.projectContentPreviews;
    this.selectedProject = project;
    if (this.modal) {
      this.modal.open(`Progetto: ${this.selectedProject.name}`);
    }
  }

  decodeMonth(monthUse?: string): string {
    return ContentMonthUse[monthUse as keyof typeof ContentMonthUse]
  }
}

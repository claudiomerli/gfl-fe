import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {Project, ProjectStatus} from "../../../shared/model/project";

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

  isInAvailableStatus(project: Project): boolean {
    return this.availableStatusProject.includes(project.status)
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}

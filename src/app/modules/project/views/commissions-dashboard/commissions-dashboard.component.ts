import {Component, OnInit} from '@angular/core';
import {contentTypes, periods, projectCommissionStatus, userRoles, validateObject} from "../../../shared/utils/utils";
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectService} from 'src/app/modules/shared/services/project.service';
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {Project, ProjectCommission} from "../../../shared/messages/project/project";
import {User} from "../../../shared/messages/auth/user";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SearchMessageDTO} from "../../../shared/messages/message/search-message.dto";
import {ChatDialogComponent} from "../../../shared/components/chat-dialog/chat-dialog.component";
import * as moment from "moment";

@Component({
  selector: 'app-commissions-dashboard',
  templateUrl: './commissions-dashboard.component.html',
  styleUrls: ['./commissions-dashboard.component.scss']
})
export class CommissionsDashboardComponent implements OnInit {

  constructor(private projectService: ProjectService, private store: Store, private dialogService: MatDialog) {
  }

  projectCommissions?: PageResponseDto<ProjectCommission>;

  filterFormGroup = new FormGroup({
    project: new FormControl<Project | string>('', [validateObject]),
    newspaper: new FormControl<Newspaper | string>('', [validateObject]),
    user: new FormControl<User | string>('', [validateObject]),
    deliveryDateFrom: new FormControl(''),
    deliveryDateTo: new FormControl(''),
    includeArchived: new FormControl<boolean>(false),
  })

  pagination = PaginationDto.build(0, 10)

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.search()
    let user = this.store.selectSnapshot(AuthenticationState.user)
    if (user?.role === "ADMIN") {
      this.displayedColumns.push("project")
      this.displayedColumns.push("newspaper")
      this.displayedColumns.push("status")
      this.displayedColumns.push("deliveryDate")
      this.displayedColumns.push("period")
      this.displayedColumns.push("contentType")
      this.displayedColumns.push("publicationDate")
      this.displayedColumns.push("publicationWorkNotes")
      this.displayedColumns.push("contentWorkNotes")
      this.displayedColumns.push("actions")
    }

    if (user?.role === "PUBLISHER") {
      this.displayedColumns.push("project")
      this.displayedColumns.push("newspaper")
      this.displayedColumns.push("status")
      this.displayedColumns.push("publicationDate")
      this.displayedColumns.push("publicationWorkNotes")
      this.displayedColumns.push("actions")
    }

    if (user?.role === "CHIEF_EDITOR") {
      this.displayedColumns.push("project")
      this.displayedColumns.push("newspaper")
      this.displayedColumns.push("status")
      this.displayedColumns.push("deliveryDate")
      this.displayedColumns.push("period")
      this.displayedColumns.push("contentType")
      this.displayedColumns.push("contentWorkNotes")
      this.displayedColumns.push("actions")
    }

    this.filterFormGroup.valueChanges.subscribe(() => this.search())
  }

  search() {
    if (this.filterFormGroup.valid) {
      let searchValue = this.filterFormGroup.value;
      this.projectService.findCommissionDashboard({
        deliveryDateFrom: searchValue.deliveryDateFrom!,
        deliveryDateTo: searchValue.deliveryDateTo!,
        newspaperId: (searchValue.newspaper as Newspaper)?.id,
        projectId: (searchValue.project as Project)?.id,
        customerId: (searchValue.user as User)?.id,
        includeArchived: searchValue.includeArchived!
      }, this.pagination).subscribe((result) => {
        this.projectCommissions = result
      })
    }
  }

  protected readonly periods = periods;
  protected readonly contentTypes = contentTypes;
  protected readonly projectCommissionStatus = projectCommissionStatus;

  changePage($event: PageEvent) {
    this.pagination.page = $event.pageIndex
    this.pagination.pageSize = $event.pageSize
    this.search()
  }

  rowClass(projectCommission: ProjectCommission) {
    let user = this.store.selectSnapshot(AuthenticationState.user)!;
    if (user?.role === "ADMIN" || user?.role === "PUBLISHER") {
      return {
        'bg-warning': moment().diff(moment(projectCommission.publicationDate), "day") > -1 && moment().diff(moment(projectCommission.publicationDate), "day") < 0,
        'bg-danger': moment().diff(moment(projectCommission.publicationDate), "day") > 0,
      }
    }

    if (user?.role === "CHIEF_EDITOR") {
      return {
        'bg-warning': moment().diff(moment(projectCommission.deliveryDate), "day") > -2 && moment().diff(moment(projectCommission.deliveryDate), "day") < 0,
        'bg-danger': moment().diff(moment(projectCommission.deliveryDate), "day") > 0,
        'bg-orange': !(moment().diff(moment(projectCommission.deliveryDate), "day") > -2 && moment().diff(moment(projectCommission.deliveryDate), "day") < 0) && !(moment().diff(moment(projectCommission.deliveryDate), "day") > 0) && projectCommission.newspaper.warning,
      }
    }

    return {}
  }

  openChat(role: string, id: string) {
    let user = this.store.selectSnapshot(AuthenticationState.user)
    const config: MatDialogConfig<SearchMessageDTO> = {
      width: "800px",
      data: {
        title: "Messaggi con " + userRoles.find(value => value.code === role)?.label,
        topicId: id,
        topicType: "PROJECT_COMMISSION",
        participant1Role: user?.role,
        participant2Role: role
      }
    }
    this.dialogService.open(ChatDialogComponent, config)

  }
}

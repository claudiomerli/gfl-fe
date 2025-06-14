import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationDto} from "../messages/common/pagination.dto";
import {environment} from "../../../../environments/environment";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {Project, ProjectCommission} from "../messages/project/project";
import {Observable} from "rxjs";
import {SaveProjectDto} from "../messages/project/save-project.dto";
import {SaveProjectCommissionDto} from "../messages/project/save-project-commission.dto";
import {Store} from "@ngxs/store";
import {map, tap} from "rxjs/operators";
import {AuthenticationState} from "../../store/state/authentication-state";
import {SaveAttachmentDto} from "../messages/attachment/save-attachment.dto";
import {normalizeSearchDto, ProjectCommissionStatus, projectCommissionStatus} from "../utils/utils";
import {Newspaper} from "../messages/newspaper/newspaper";
import {SearchProjectDto} from "../messages/project/search-project.dto";
import {SearchCommissionDashboardDto} from "../messages/project/search-commission-dashboard.dto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient, private store: Store) {
  }

  public exportList(searchProjectDTO: SearchProjectDto): Observable<Blob> {
    return this.httpClient.get(environment.apiBaseurl + "/project/export", {
      params: {
        globalSearch: searchProjectDTO.globalSearch || "",
        status: searchProjectDTO.status || "",
        projectCommissionStatus: searchProjectDTO.projectCommissionStatus || [],
        commissionYear: searchProjectDTO.commissionYear || "",
        commissionPeriod: searchProjectDTO.commissionPeriod || "",
        newspapers: searchProjectDTO.newspapers || [],
      },
      responseType: "blob"
    })
  }

  public find(searchProjectDTO: SearchProjectDto, pagination: PaginationDto): Observable<PageResponseDto<Project>> {
    return this.httpClient.get<PageResponseDto<Project>>(environment.apiBaseurl + "/project", {
      params: {
        globalSearch: searchProjectDTO.globalSearch || "",
        status: searchProjectDTO.status || "",
        projectCommissionStatus: searchProjectDTO.projectCommissionStatus || [],
        commissionYear: searchProjectDTO.commissionYear || "",
        commissionPeriod: searchProjectDTO.commissionPeriod || "",
        newspapers: searchProjectDTO.newspapers || [],
        customerId: searchProjectDTO.customerId || "",
        ...pagination
      }
    }).pipe(
      tap((page) => {
        let user = this.store.selectSnapshot(AuthenticationState.user);
        page.content.forEach(project => {
          project.projectCommissions = project.projectCommissions.filter(pc => {
            let commissionStatus = projectCommissionStatus.find(value => value.code == pc.status)!;
            return commissionStatus.roleCanView.includes(user?.role!)
          })
        })
      })
    )
  }

  public findForAutocomplete(globalSearch: string, status: string, pagination: PaginationDto): Observable<PageResponseDto<Project>> {
    return this.httpClient.get<PageResponseDto<Project>>(environment.apiBaseurl + "/project", {
      headers: {disableSpinner: "true"},
      params: {
        globalSearch: globalSearch || "",
        status: status || "",
        ...pagination
      }
    }).pipe(
      tap((page) => {
        let user = this.store.selectSnapshot(AuthenticationState.user);
        page.content.forEach(project => {
          project.projectCommissions = project.projectCommissions.filter(pc => {
            let commissionStatus = projectCommissionStatus.find(value => value.code == pc.status)!;
            return commissionStatus.roleCanView.includes(user?.role!)
          })
        })
      })
    )
  }

  public findById(id: number): Observable<Project> {
    return this.httpClient.get<Project>(environment.apiBaseurl + "/project/" + id)
  }

  public deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseurl + "/project/" + id)
  }

  public save(saveProjectDto: SaveProjectDto): Observable<Project> {
    return this.httpClient.post<Project>(environment.apiBaseurl + "/project", saveProjectDto)
  }

  public update(id: number, saveProjectDto: SaveProjectDto): Observable<Project> {
    return this.httpClient.put<Project>(environment.apiBaseurl + "/project/" + id, saveProjectDto)
  }

  public invoice(id: number): Observable<Project> {
    return this.httpClient.put<Project>(environment.apiBaseurl + "/project/" + id + "/invoice", {})
  }

  public saveCommission(idProject: number, saveCommissionProjectDto: SaveProjectCommissionDto): Observable<Project> {
    return this.httpClient.post<Project>(environment.apiBaseurl + "/project/" + idProject + "/commission", saveCommissionProjectDto)
  }

  public updateCommission(idProject: number, idProjectCommission: number, saveCommissionProjectDto: SaveProjectCommissionDto): Observable<Project> {
    return this.httpClient.put<Project>(environment.apiBaseurl + "/project/" + idProject + "/commission/" + idProjectCommission, saveCommissionProjectDto)
  }

  public removeCommission(idProject: number, idProjectCommission: number): Observable<Project> {
    return this.httpClient.delete<Project>(environment.apiBaseurl + "/project/" + idProject + "/commission/" + idProjectCommission)
  }

  public updateCommissionStatus(idProject: number, idProjectCommission: number, status: string, metadata: any = {}): Observable<Project> {
    return this.httpClient.put<Project>(environment.apiBaseurl + "/project/" + idProject + "/commission/" + idProjectCommission + "/" + status, metadata)
  }

  public updateCommissionCostSell(idProject: number, idProjectCommission: number, costSell: number): Observable<Project> {
    return this.httpClient.put<Project>(environment.apiBaseurl + "/project/" + idProject + "/commission/" + idProjectCommission + "/costSell", {
      costSell
    })
  }

  updateCommissionStatusBulk(idProject: number, ids: number[], status: any) {
    return this.httpClient.put<Project>(environment.apiBaseurl + "/project/" + idProject + "/commission/bulk/" + status, {
      ids
    })
  }

  export(id: number): Observable<Blob> {
    return this.httpClient.get(environment.apiBaseurl + `/project/${id}/export`, {
      responseType: "blob"
    })
  }

  getCommissions(project: Project, paginationDto: PaginationDto): Observable<ProjectCommission[]> {
    return this.httpClient.get<ProjectCommission[]>(environment.apiBaseurl + `/project/${project.id}/commissions`, {
      params: {
        ...paginationDto
      }
    }).pipe(
      map((projectCommissions) => {
        let user = this.store.selectSnapshot(AuthenticationState.user)!;
        return projectCommissions.filter(projectCommission => projectCommissionStatus.find(e => e.code === projectCommission.status)!.roleCanView.includes(user.role!))
      })
    );
  }

  uploadProjectHintAttachment(id: number, saveAttachmentDto: SaveAttachmentDto) {
    return this.httpClient.post(environment.apiBaseurl + `/project/${id}/hint/attachment`, saveAttachmentDto)
  }

  deleteProjectHintAttachment(id: number, attachmentId: number) {
    return this.httpClient.delete(environment.apiBaseurl + `/project/${id}/hint/attachment/${attachmentId}`)
  }

  uploadProjectCommissionHintAttachment(projectId: number, commissionId: number, saveAttachmentDto: SaveAttachmentDto) {
    return this.httpClient.post(environment.apiBaseurl + `/project/${projectId}/commission/${commissionId}/hint/attachment`, saveAttachmentDto)
  }

  deleteProjectCommissionHintAttachment(projectId: number, commissionId: number, attachmentId: number) {
    return this.httpClient.delete(environment.apiBaseurl + `/project/${projectId}/commission/${commissionId}/hint/attachment/${attachmentId}`)
  }

  updateProjectCommissionHint(projectId: number, commissionId: number, body: {
    body: string | null
  }, withoutSpinner?: boolean) {
    return this.httpClient.put<void>(environment.apiBaseurl + `/project/${projectId}/commission/${commissionId}/hint`, body, {
      headers: {disableSpinner: withoutSpinner ? "true" : "false"}
    })
  }

  getNextCommissionStepCodesByActualStatusCode(code: string, projectType: 'REGULAR' | 'DOMAIN', includeNotButton = false): string[] {
    let user = this.store.selectSnapshot(AuthenticationState.user)!;

    //L'amministratore vede sempre tutti i passi
    if (user.role === "ADMIN") {
      return projectCommissionStatus
        .filter(value => value.projectType.includes(projectType))
        .filter(value => value.code != code)
        .map(value => value.code)
    }

    let actualStatus = projectCommissionStatus.find(e => e.code === code)!
    if (actualStatus.roleCanEdit.includes(user.role!)) {
      return actualStatus
        .nextStatuses
        .filter(nextStatus => {
          let nextCommissionStatus = projectCommissionStatus.find(e => e.code === nextStatus)!;
          return nextCommissionStatus!.projectType.includes(projectType) && (!nextCommissionStatus.notButton || includeNotButton)
        })
    } else {
      return [];
    }
  }

  getNextCommissionStepByActualStatusCode(code: string, projectType: 'REGULAR' | 'DOMAIN'): ProjectCommissionStatus[] {
    return this.getNextCommissionStepCodesByActualStatusCode(code, projectType)
      .map(nextStatus => projectCommissionStatus.find(e => e.code === nextStatus)!)
  }

  getNewspaperForDomainProject(id: number): Observable<Newspaper> {
    return this.httpClient.get<Newspaper>(environment.apiBaseurl + `/project/${id}/newspaper`)
  }

  assignFinalCustomers(id: number, userIds: number[]) {
    return this.httpClient.put(environment.apiBaseurl + `/project/${id}/assignFinalCustomers`, userIds)
  }

  findCommissionDashboard(searchCommissionDashboard: SearchCommissionDashboardDto, pagination: PaginationDto) {
    return this.httpClient.get<PageResponseDto<ProjectCommission>>(environment.apiBaseurl + `/project/commissions`, {
      params:
        {
          ...normalizeSearchDto(searchCommissionDashboard),
          ...pagination
        },
    })
  }
}

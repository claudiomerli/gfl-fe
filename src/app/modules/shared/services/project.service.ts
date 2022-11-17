import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationDto} from "../messages/pagination.dto";
import {environment} from "../../../../environments/environment";
import {PageResponseDto} from "../messages/page-response.dto";
import {Project} from "../model/project";
import {Observable} from "rxjs";
import {SaveProjectDto} from "../messages/project/save-project.dto";
import {SaveProjectCommissionDto} from "../messages/project/save-project-commission.dto";
import {Store} from "@ngxs/store";
import {tap} from "rxjs/operators";
import {AuthenticationState} from "../../store/state/authentication-state";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient, private store: Store) {
  }

  public find(globalSearch: string, status: string, pagination: PaginationDto): Observable<PageResponseDto<Project>> {
    return this.httpClient.get<PageResponseDto<Project>>(environment.apiBaseurl + "/project", {
      params: {
        globalSearch: globalSearch || "",
        status: status || "",
        ...pagination
      }
    }).pipe(
      tap((page) => {
        let user = this.store.selectSnapshot(AuthenticationState.user);
        page.content.forEach(project => {
          if (user?.role === "CHIEF_EDITOR") {
            project.projectCommissions = project.projectCommissions.filter(pc => pc.status === "STARTED")
          }
          if (user?.role === "PUBLISHER") {
            project.projectCommissions = project.projectCommissions.filter(pc => pc.status === "TO_PUBLISH")
          }
        })
      })
    )
  }

  public findById(id: number): Observable<Project> {
    return this.httpClient.get<Project>(environment.apiBaseurl + "/project/" + id)
      .pipe(
        tap((project) => {
          let user = this.store.selectSnapshot(AuthenticationState.user);
          if (user?.role === "CHIEF_EDITOR") {
            project.projectCommissions = project.projectCommissions.filter(pc => ["CREATED", "STARTED", "ASSIGNED", "STANDBY_EDITORIAL", "TO_PUBLISH", "SENT_TO_NEWSPAPER", "STANDBY_PUBLICATION", "SENT_TO_ADMINISTRATION",].includes(pc.status))
          }
          if (user?.role === "PUBLISHER") {
            project.projectCommissions = project.projectCommissions.filter(pc => ["TO_PUBLISH", "SENT_TO_NEWSPAPER", "STANDBY_PUBLICATION", "SENT_TO_ADMINISTRATION"].includes(pc.status))
          }
        }),
        tap((project) => {
          project.projectCommissions = project.projectCommissions.sort((a, b) => b.id - a.id)
        })
      )
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

  public updateCommissionStatus(idProject: number, idProjectCommission: number, status: string): Observable<Project> {
    return this.httpClient.put<Project>(environment.apiBaseurl + "/project/" + idProject + "/commission/" + idProjectCommission + "/" + status, {})
  }

}

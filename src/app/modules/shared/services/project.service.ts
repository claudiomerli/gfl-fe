import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationDto} from "../messages/pagination.dto";
import {environment} from "../../../../environments/environment";
import {PageResponseDto} from "../messages/page-response.dto";
import {Project} from "../model/project";
import {Observable} from "rxjs";
import {SaveProjectDto} from "../messages/project/save-project.dto";
import {SaveProjectCommissionDto} from "../messages/project/save-project-commission.dto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {
  }

  public find(globalSearch: string, status: string, pagination: PaginationDto): Observable<PageResponseDto<Project>> {
    return this.httpClient.get<PageResponseDto<Project>>(environment.apiBaseurl + "/project", {
      params: {
        globalSearch: globalSearch || "",
        status: status || "",
        ...pagination
      }
    })
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

  public close(id: number): Observable<Project> {
    return this.httpClient.put<Project>(environment.apiBaseurl + "/project/" + id + "/close", {})
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

import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Project, ProjectContentPreview} from "../model/project";
import {PaginationDto} from "../messages/pagination.dto";
import {PageResponseDto} from "../messages/page-response.dto";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<any> {
    return this.httpClient.get<any>(environment.apiBaseurl + "/project")
  }

  save(project: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseurl + "/project", project);
  }

  public find(globalSearch: string, statusSearch: string, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<Project>> {
    return this.httpClient.get<PageResponseDto<Project>>(environment.apiBaseurl + "/project", {
      params: {...paginationDto, globalSearch, statusSearch}
    }).pipe(
      map(result => {
        result.content = result.content.map((c: any) => new Project(c));
        return result;
      })
    );
  }

  public findById(id: number): Observable<Project> {
    return this.httpClient.get<Project>(environment.apiBaseurl + "/project/" + id).pipe(
      map(result => {
        return new Project(result);
      })
    );
  }

  public update(id: number, project: any): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseurl + "/project/" + id, project)
  }

  public delete(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/project/" + id);
  }

  public deleteContentPreview(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/project/projectContentPreview/" + id);
  }

  public getContentPreview(id: string): Observable<ProjectContentPreview> {
    return this.httpClient.get<ProjectContentPreview>(environment.apiBaseurl + "/project/projectContentPreview/" + id);
  }

  public assegnaCapoRedattore(projectID: number, userID: number) {
    return this.httpClient.put(environment.apiBaseurl + "/project/" + projectID + "/assign-chief-editor", {id: userID});
  }

  changeStatus(project: Project) {
    return this.httpClient.put(environment.apiBaseurl + "/project/" + project.id + "/change-status", {
      status: project.nextState
    });
  }
}

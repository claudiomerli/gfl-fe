import { Injectable } from '@angular/core';
import {AccessTokenDto} from "../messages/access-token.dto";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer";
import {Project} from "../model/project";
import {SaveCustomerDto} from "../messages/customer/save-customer.dto";
import {PaginationDto} from "../messages/pagination.dto";
import {PageResponseDto} from "../messages/page-response.dto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any>  {
    return this.httpClient.get<any>(environment.apiBaseurl + "/project");
  }

  save(project: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseurl + "/project", project);
  }

  public find(globalSearch: string, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<Project>> {
    return this.httpClient.get<PageResponseDto<Project>>(environment.apiBaseurl + "/project", {
      params: {...paginationDto, globalSearch}
    })
  }

  public findById(id: number): Observable<Project> {
    return this.httpClient.get<Project>(environment.apiBaseurl + "/project/" + id);
  }

  public update(id: number, project: any): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseurl + "/project/" + id, project)
  }

  public delete(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/project/" + id);
  }
}

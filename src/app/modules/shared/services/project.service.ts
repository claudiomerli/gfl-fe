import { Injectable } from '@angular/core';
import {AccessTokenDto} from "../messages/access-token.dto";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

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
}

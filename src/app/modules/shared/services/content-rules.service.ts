import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ContentRules} from "../model/content-rules";

@Injectable({
  providedIn: 'root'
})
export class ContentRulesService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any>  {
    return this.httpClient.get<any>(environment.apiBaseurl + "/content-rules");
  }

  save(contentRules: any): Observable<ContentRules> {
    return this.httpClient.post<any>(environment.apiBaseurl + "/content-rules", contentRules);
  }
}

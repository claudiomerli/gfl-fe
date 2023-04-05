import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContentHintTemplate} from "../messages/project/content-hint-template";
import {environment} from "../../../../environments/environment";
import {SaveContentHintTemplate} from "../messages/project/save-content-hint-template";

@Injectable({
  providedIn: 'root'
})
export class ContentHintTemplateService {

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<ContentHintTemplate[]> {
    return this.http.get<ContentHintTemplate[]>(environment.apiBaseurl + "/project/contentHintTemplate");
  }

  public save(saveContentHintTemplate: SaveContentHintTemplate): Observable<void> {
    return this.http.post<void>(environment.apiBaseurl + "/project/contentHintTemplate", saveContentHintTemplate);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiBaseurl + `/project/contentHintTemplate/${id}`);
  }

}

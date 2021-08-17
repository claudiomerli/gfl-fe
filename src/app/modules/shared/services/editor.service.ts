import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SaveEditorDto} from "../messages/save-editor.dto";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private httpClient: HttpClient) {
  }

  public save(saveEditorDto: SaveEditorDto): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + "/editor", saveEditorDto)
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SaveEditorDto} from "../messages/editors/save-editor.dto";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PaginationDto} from "../messages/pagination.dto";
import {PageResponseDto} from "../messages/page-response.dto";
import {User} from "../model/user";
import {EditEditorDto} from "../messages/editors/edit-editor.dto";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private httpClient: HttpClient) {
  }

  public save(saveEditorDto: SaveEditorDto): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + "/editor", saveEditorDto)
  }

  public update(id: number, editEditorDto: EditEditorDto): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseurl + "/editor/" + id, editEditorDto)
  }

  public find(globalSearch: string, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<User>> {
    return this.httpClient.get<PageResponseDto<User>>(environment.apiBaseurl + "/editor", {
      params: {...paginationDto, globalSearch}
    })
  }

  public delete(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/editor/" + id);
  }

  public findById(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiBaseurl + "/editor/" + id);
  }
}

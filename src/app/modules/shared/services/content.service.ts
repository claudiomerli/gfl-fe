import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable, zip} from "rxjs";
import {Content} from "../messages/content/content";
import {SaveContentDto} from "../messages/content/save-content.dto";
import {PaginationDto} from "../messages/common/pagination.dto";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {ProjectService} from "./project.service";
import {FindContentFilterDto} from "../messages/content/find-content-filter.dto";
import {saveAs} from "file-saver";
import {WordpressCategory} from "../messages/content/wordpress-category";
import {WordpressPublishDto} from "../messages/content/wordpress-publish.dto";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient, private projectService: ProjectService) {
  }

  findById(id: number): Observable<Content> {
    return this.httpClient
      .get<Content>(environment.apiBaseurl + "/content/" + id)
  }

  assignToEditor(id: number, idUser: number): Observable<void> {
    return this.httpClient
      .put<void>(environment.apiBaseurl + `/content/${id}/assign/${idUser}`, {})
  }

  updateWithNoSpinner(id: number, saveContentDto: SaveContentDto) {
    return this.httpClient
      .put<void>(environment.apiBaseurl + `/content/${id}`, saveContentDto, {
        headers: {
          disableSpinner: "true"
        }
      })
  }

  updateStatus(id: number, status: string) {
    return this.httpClient
      .put<void>(environment.apiBaseurl + `/content/${id}/status/${status}`, {})
  }

  find(findContentDTO: FindContentFilterDto, pagination: PaginationDto): Observable<any> {
    return this.httpClient
      .get<PageResponseDto<Content>>(environment.apiBaseurl + '/content', {
        params: {
          ...findContentDTO,
          ...pagination
        }
      })
  }

  exportDocx(id: number): Observable<Blob> {
    return this.httpClient.get(environment.apiBaseurl + `/content/${id}/export`, {
      responseType: "blob"
    })
  }

  publishOnWordpress(id: number, publicationdateDTO: WordpressPublishDto) {
    return this.httpClient.post(environment.apiBaseurl + `/content/${id}/publishOnWordpress`, publicationdateDTO)
  }

  getWordpressCategory(id: number) : Observable<WordpressCategory[]> {
    return this.httpClient.get<WordpressCategory[]>(environment.apiBaseurl + `/content/${id}/wordpressCategory`)
  }
}

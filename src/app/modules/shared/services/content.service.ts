import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationDto} from "../messages/pagination.dto";
import {PageResponseDto} from "../messages/page-response.dto";
import {Customer} from "../model/customer";
import {environment} from "../../../../environments/environment";
import {Content} from "../model/content";
import {Observable} from "rxjs";
import {SearchContentDto} from "../messages/search-content.dto";
import {clean} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) {
  }

  public find(searchParameter: SearchContentDto, pagination: PaginationDto = new PaginationDto()): Observable<PageResponseDto<Content>> {
    return this.httpClient.get<PageResponseDto<Content>>(environment.apiBaseurl + "/content", {
      params: {...clean(searchParameter), ...pagination}
    })
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {PaginationDto} from "../messages/pagination.dto";
import {PageResponseDto} from "../messages/page-response.dto";
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

  public save(contentDto: any): Observable<any> {
    return this.httpClient.post<void>(environment.apiBaseurl + "/content", contentDto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<void>(environment.apiBaseurl + "/content/" + id);
  }

  public findById(id: number): Observable<Content> {
    return this.httpClient.get<Content>(environment.apiBaseurl + "/content/" + id);
  }

  public update(id: number | undefined, contentDto: any) {
    return this.httpClient.put<void>(environment.apiBaseurl + "/content/" + id, contentDto);
  }

  public exportPdf(id: number | undefined): Observable<HttpResponse<Blob>> {
    return this.httpClient.get<Blob>(environment.apiBaseurl + "/content/" + id + "/exportPdf", {
      observe: "response",
      responseType: "blob" as "json"
    })
  }

  public exportDocx(id: number | undefined): Observable<HttpResponse<Blob>> {
    return this.httpClient.get<Blob>(environment.apiBaseurl + "/content/" + id + "/exportDocx", {
      observe: "response",
      responseType: "blob" as "json"
    })
  }

  public deliver(id: number | undefined) {
    return this.httpClient.put(environment.apiBaseurl + "/content/" + id + "/deliver", null)
  }

  public getContentCustomer(id: number, customerToken: string): Observable<Content> {
    return this.httpClient.get<Content>(environment.apiBaseurl + "/content/customer/" + id, {
      params: {
        token: customerToken
      }
    })
  }

  public approveContentCustomer(id: number, customerToken: string): Observable<Content> {
    return this.httpClient.put<Content>(environment.apiBaseurl + "/content/customer/" + id + "/approve", null, {
      params: {
        token: customerToken
      }
    })
  }

  public saveNotes(id: number, notes: string, customerToken: string): Observable<Content> {
    return this.httpClient.put<Content>(environment.apiBaseurl + "/content/customer/" + id + "/notes", {
      notes
    }, {
      params: {
        token: customerToken
      }
    })
  }

}

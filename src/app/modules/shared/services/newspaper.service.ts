import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {User} from "../model/user";
import {Newspaper} from "../model/newspaper";
import {SaveNewspaperDto} from "../messages/newspaper/save-newspaper.dto";
import {PageResponseDto} from "../messages/page-response.dto";
import {PaginationDto} from "../messages/pagination.dto";
import {Finance} from "../model/finance";
import {clean} from "../utils/utils";
import {SelectDto} from "../messages/select.dto";
import {SearchNewspaperDto} from "../messages/newspaper/search-newspaper.dto";
import {MaxMinRangeNewspaperAttributes} from "../model/max-min-range-newspaper-attributes";

@Injectable({
  providedIn: 'root'
})
export class NewspaperService {

  constructor(private httpClient: HttpClient) {
  }

  public save(saveNewspaperDto: SaveNewspaperDto): Observable<Newspaper> {
    return this.httpClient.post<Newspaper>(environment.apiBaseurl + "/newspaper", saveNewspaperDto)
  }

  public update(id: number, editNewspaperDto: SaveNewspaperDto): Observable<Newspaper> {
    return this.httpClient.put<Newspaper>(environment.apiBaseurl + "/newspaper/" + id, editNewspaperDto)
  }

  public find(searchNewspaperDto: SearchNewspaperDto, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<Newspaper>> {
    return this.httpClient.get<PageResponseDto<Newspaper>>(environment.apiBaseurl + "/newspaper", {
      params: {...paginationDto, ...searchNewspaperDto}
    })
  }

  public findForAutocomplete(searchNewspaperDto: SearchNewspaperDto, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<Newspaper>> {
    return this.httpClient.get<PageResponseDto<Newspaper>>(environment.apiBaseurl + "/newspaper", {
      params: {...paginationDto, ...searchNewspaperDto},
      headers: {disableSpinner: "true"}
    })
  }

  public getMaxMinRangeNewspaperAttributes() {
    return this.httpClient.get<MaxMinRangeNewspaperAttributes>(environment.apiBaseurl + "/newspaper/maxMinRangeAttributes")
  }

  public exportExcel(searchNewspaperDto: SearchNewspaperDto): Observable<any> {
    return this.httpClient.get(environment.apiBaseurl + "/newspaper/export/excel", {
      params: {...searchNewspaperDto},
      responseType: "blob"
    })
  }

  public exportPDF(searchNewspaperDto: SearchNewspaperDto): Observable<any> {
    return this.httpClient.get(environment.apiBaseurl + "/newspaper/export/pdf", {
      params: {...searchNewspaperDto},
      responseType: "blob"
    })
  }

  public delete(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/newspaper/" + id);
  }

  public findById(id: number): Observable<Newspaper> {
    return this.httpClient.get<Newspaper>(environment.apiBaseurl + "/newspaper/" + id);
  }

  public finance(): Observable<Finance> {
    return this.httpClient.get<Finance>(environment.apiBaseurl + "/newspaper/finance");
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Newspaper} from "../messages/newspaper/newspaper";
import {SaveNewspaperDto} from "../messages/newspaper/save-newspaper.dto";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {PaginationDto} from "../messages/common/pagination.dto";
import {Finance} from "../messages/newspaper/finance";
import {SearchNewspaperDto} from "../messages/newspaper/search-newspaper.dto";
import {MaxMinRangeNewspaperAttributes} from "../messages/newspaper/max-min-range-newspaper-attributes";
import {ExportReport} from "../messages/newspaper/export-report";

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

  public exportReport(exportReport: ExportReport[]) {
    return this.httpClient.post(environment.apiBaseurl + "/newspaper/report", exportReport, {
      responseType: "blob"
    })
  }

  public saveDescription(id: number, body: { description: string | null }) {
    return this.httpClient.put(environment.apiBaseurl + "/newspaper/" + id + "/description", body)
  }

  public getDescription(id: number) {
    return this.httpClient.get<{ description: string | null }>(environment.apiBaseurl + "/newspaper/" + id + "/description")
  }
}

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

@Injectable({
  providedIn: 'root'
})
export class NewspaperService {

  constructor(private httpClient: HttpClient) {
  }

  public save(saveNewspaperDto: SaveNewspaperDto): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + "/newspaper", saveNewspaperDto)
  }

  public update(id: number, editNewspaperDto: SaveNewspaperDto): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseurl + "/newspaper/" + id, editNewspaperDto)
  }

  public findForSelect(): Observable<Array<SelectDto>> {
    return this.httpClient.get<Array<SelectDto>>(environment.apiBaseurl + "/newspaper/select");
  }
  public findPriceQuotation(form: any, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<Newspaper>> {
    return this.httpClient.get<PageResponseDto<Newspaper>>(environment.apiBaseurl + "/newspaper/price-quotation", {
      params: {...clean(form),...paginationDto}
    })
  }

  public find(globalSearch: string, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<Newspaper>> {
    return this.httpClient.get<PageResponseDto<Newspaper>>(environment.apiBaseurl + "/newspaper", {
      params: {...paginationDto, globalSearch}
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

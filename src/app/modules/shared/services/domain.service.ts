import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationDto} from "../messages/common/pagination.dto";
import {Observable} from "rxjs";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {Domain} from "../messages/domain/domain";
import {environment} from "../../../../environments/environment";
import {SaveDomainDto} from "../messages/domain/save-domain.dto";
import {SearchDomainDto} from "../messages/domain/search-domain.dto";

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(private httpClient: HttpClient) {
  }

  public findAll(searchDomain: SearchDomainDto, pagination: PaginationDto): Observable<PageResponseDto<Domain>> {
    return this.httpClient.get<PageResponseDto<Domain>>(environment.apiBaseurl + "/domain", {
      params: {
        globalSearch: searchDomain.globalSearch || "",
        expirationFrom: searchDomain.expirationFrom || "",
        expirationTo: searchDomain.expirationTo || "",
        hostingId: searchDomain.hostingId || "",
        ...pagination,
      }
    })
  }

  public findById(id: number): Observable<Domain> {
    return this.httpClient.get<Domain>(environment.apiBaseurl + `/domain/${id}`)
  }

  public save(saveDomainDto: SaveDomainDto): Observable<Domain> {
    return this.httpClient.post<Domain>(environment.apiBaseurl + `/domain`, saveDomainDto)
  }

  public update(id: number, saveDomainDto: SaveDomainDto): Observable<Domain> {
    return this.httpClient.put<Domain>(environment.apiBaseurl + `/domain/${id}`, saveDomainDto)
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseurl + `/domain/${id}`);
  }
}

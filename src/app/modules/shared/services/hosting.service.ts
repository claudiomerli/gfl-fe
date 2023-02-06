import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationDto} from "../messages/common/pagination.dto";
import {Observable} from "rxjs";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {Hosting} from "../messages/hosting/hosting";
import {environment} from "../../../../environments/environment";
import {SaveHostingDto} from "../messages/hosting/save-hosting.dto";

@Injectable({
  providedIn: 'root'
})
export class HostingService {

  constructor(private httpClient: HttpClient) {
  }

  public findAll(globalSearch: string, pagination: PaginationDto): Observable<PageResponseDto<Hosting>> {
    return this.httpClient.get<PageResponseDto<Hosting>>(environment.apiBaseurl + "/hosting", {
      params: {
        globalSearch,
        ...pagination
      }
    })
  }

  public findById(id: number): Observable<Hosting> {
    return this.httpClient.get<Hosting>(environment.apiBaseurl + `/hosting/${id}`)
  }

  public save(saveHostingDto: SaveHostingDto): Observable<Hosting> {
    return this.httpClient.post<Hosting>(environment.apiBaseurl + `/hosting`, saveHostingDto)
  }

  public update(id: number, saveHostingDto: SaveHostingDto): Observable<Hosting> {
    return this.httpClient.put<Hosting>(environment.apiBaseurl + `/hosting/${id}`, saveHostingDto)
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseurl + `/hosting/${id}`);
  }

  public findForAutocomplete(globalSearch: string, pagination: PaginationDto) {
    return this.httpClient.get<PageResponseDto<Hosting>>(environment.apiBaseurl + "/hosting", {
      headers: {disableSpinner: "true"},
      params: {
        globalSearch,
        ...pagination
      }
    })
  }
}

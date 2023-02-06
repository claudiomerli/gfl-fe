import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationDto} from "../messages/common/pagination.dto";
import {environment} from "../../../../environments/environment";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {News} from "../messages/news/news";
import {Observable} from "rxjs";
import {SaveNewsDto} from "../messages/news/save-news.dto";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) {
  }

  public findAll(globalSearch: string, pagination: PaginationDto): Observable<PageResponseDto<News>> {
    return this.httpClient.get<PageResponseDto<News>>(environment.apiBaseurl + "/news", {
      params: {
        globalSearch,
        ...pagination
      },
      headers: {
        disableSpinner: "true"
      }
    })
  }

  public findById(id: number): Observable<News> {
    return this.httpClient.get<News>(environment.apiBaseurl + `/news/${id}`)
  }

  public save(saveNewsDto: SaveNewsDto): Observable<News> {
    return this.httpClient.post<News>(environment.apiBaseurl + `/news`, saveNewsDto)
  }

  public update(id: number, saveNewsDto: SaveNewsDto): Observable<News> {
    return this.httpClient.put<News>(environment.apiBaseurl + `/news/${id}`, saveNewsDto)
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseurl + `/news/${id}`);
  }

}

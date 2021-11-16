import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {PaginationDto} from "../messages/pagination.dto";
import {PageResponseDto} from "../messages/page-response.dto";
import {Newspaper} from "../model/newspaper";
import {SaveTopicDto} from "../messages/topic/save-topic.dto";
import {Topic} from "../model/topic";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private httpClient: HttpClient) {
  }

  public save(saveTopicDto: SaveTopicDto): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + "/topic", saveTopicDto)
  }

  public update(id: number, saveTopicDto: SaveTopicDto): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseurl + "/topic/" + id, saveTopicDto)
  }

  public find(globalSearch: string, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<Topic>> {
    return this.httpClient.get<PageResponseDto<Topic>>(environment.apiBaseurl + "/topic", {
      params: {...paginationDto, globalSearch}
    })
  }

  public findAll(): Observable<Array<Topic>> {
    return this.httpClient.get<Array<Topic>>(environment.apiBaseurl + "/topic/all")
  }

  public delete(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/topic/" + id);
  }

  public findById(id: number): Observable<Topic> {
    return this.httpClient.get<Topic>(environment.apiBaseurl + "/topic/" + id);
  }
}

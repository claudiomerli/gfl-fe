import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SaveMessageDTO} from "../messages/message/save-messge.dto";
import {Observable} from "rxjs";
import {Message} from "../messages/message/message";
import {SearchMessageDTO} from "../messages/message/search-message.dto";
import {environment} from "../../../../environments/environment";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {PaginationDto} from "../messages/common/pagination.dto";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  saveMessage(saveMessageDTO: SaveMessageDTO): Observable<Message> {
    return this.http.post<Message>(environment.apiBaseurl + "/messages", saveMessageDTO, {
      headers: {
        disableSpinner: "true"
      }
    });
  }

  searchMessages(searchMessageDTO: SearchMessageDTO, pageable: PaginationDto): Observable<PageResponseDto<Message>> {
    let params = new HttpParams();
    // Add search parameters to HttpParams
    if (searchMessageDTO.participant1Role) {
      params = params.set('participant1Role', searchMessageDTO.participant1Role);
    }
    if (searchMessageDTO.participant1UserId) {
      params = params.set('participant1UserId', searchMessageDTO.participant1UserId.toString());
    }
    if (searchMessageDTO.participant2Role) {
      params = params.set('participant2Role', searchMessageDTO.participant2Role);
    }
    if (searchMessageDTO.participant2UserId) {
      params = params.set('participant2UserId', searchMessageDTO.participant2UserId.toString());
    }
    if (searchMessageDTO.topicId) {
      params = params.set('topicId', searchMessageDTO.topicId);
    }
    if (searchMessageDTO.topicType) {
      params = params.set('topicType', searchMessageDTO.topicType);
    }

    params = params.set('page', pageable.page!).set('pageSize', pageable.pageSize!);

    return this.http.get<PageResponseDto<Message>>(environment.apiBaseurl + "/messages", {
      params,
      headers: {
        disableSpinner: "true"
      }
    });
  }

  readMessage(id: number): Observable<Message> {
    return this.http.put<Message>(`${environment.apiBaseurl}/messages/${id}`, null);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PaginationDto} from "../messages/pagination.dto";
import {PageResponseDto} from "../messages/page-response.dto";
import {User} from "../model/user";
import {EditUserDto} from "../messages/users/edit-user.dto";
import {SaveUserDto} from "../messages/users/save-user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public save(saveUserDto: SaveUserDto): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + "/user", saveUserDto)
  }

  public update(id: number, editUserDto: EditUserDto): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseurl + "/user/" + id, editUserDto)
  }

  public find(globalSearch: string, role: string, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<User>> {
    return this.httpClient.get<PageResponseDto<User>>(environment.apiBaseurl + "/user", {
      params: {...paginationDto, globalSearch, role}
    })
  }

  public delete(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/user/" + id);
  }

  public findById(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiBaseurl + "/user/" + id);
  }
}

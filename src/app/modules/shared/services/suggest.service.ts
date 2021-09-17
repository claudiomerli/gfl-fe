import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Suggest} from "../model/suggest";

@Injectable({
  providedIn: 'root'
})
export class SuggestService {

  constructor(private httpClient: HttpClient) {
  }

  public save(newKeyword: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + "/suggests", {
      keywords: [newKeyword]
    })
  }

  public find(): Observable<Suggest[]> {
    return this.httpClient.get<Suggest[]>(environment.apiBaseurl + "/suggests")
  }

  public delete(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/suggests/" + id);
  }
}

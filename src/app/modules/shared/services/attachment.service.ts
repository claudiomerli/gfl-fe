import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private httpClient: HttpClient) {
  }

  public downloadFile(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(environment.apiBaseurl + "/attachment/" + id, {
      observe: 'response',
      responseType: "blob" as "json"
    })
  }
}

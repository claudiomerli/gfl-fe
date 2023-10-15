import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) {
  }

  public sendEmailForWaitApprovalContent(idContent: number): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + `/notification/email/approve-content/${idContent}`, {})
  }

  public sendEmailForMonthClosedContent(idProject: number, period: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + `/notification/email/close-month/${idProject}/${period}`, {})
  }
}

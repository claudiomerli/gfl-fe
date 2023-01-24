import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attachment} from "../messages/common/attachment";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient) {
  }

  public downloadAttachment(attachment: Attachment){
    return this.http.get(environment.apiBaseurl + `/attachment/${attachment.id}`,{
      responseType: "blob"
    })
  }
}

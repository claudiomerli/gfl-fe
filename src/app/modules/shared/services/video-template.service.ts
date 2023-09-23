import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VideoTemplate} from "../messages/video-template/video-template";
import {environment} from "../../../../environments/environment";
import {SaveVideoTemplateDto} from "../messages/video-template/save-video-template.dto";

@Injectable({
  providedIn: 'root'
})
export class VideoTemplateService {

  constructor(private http: HttpClient) { }

  getAllVideoTemplates(): Observable<VideoTemplate[]> {
    return this.http.get<VideoTemplate[]>(`${environment.apiBaseurl}/video-templates`);
  }

  getVideoTemplateById(id: number): Observable<VideoTemplate> {
    return this.http.get<VideoTemplate>(`${environment.apiBaseurl}/video-templates/${id}`);
  }

  createVideoTemplate(saveVideoTemplate: SaveVideoTemplateDto): Observable<VideoTemplate> {
    return this.http.post<VideoTemplate>(`${environment.apiBaseurl}/video-templates`, saveVideoTemplate);
  }

  updateVideoTemplate(id: number, saveVideoTemplate: SaveVideoTemplateDto): Observable<VideoTemplate> {
    return this.http.put<VideoTemplate>(`${environment.apiBaseurl}/video-templates/${id}`, saveVideoTemplate);
  }

  deleteVideoTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseurl}/video-templates/${id}`);
  }
}

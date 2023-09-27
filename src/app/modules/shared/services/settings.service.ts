import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlatformSettings} from "../messages/settings/settings";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  constructor(private httpClient: HttpClient) { }

  getSettings(): Observable<PlatformSettings[]> {
    return this.httpClient.get<PlatformSettings[]>(environment.apiBaseurl + "/settings");
  }

  saveSettings(settings: PlatformSettings): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseurl + "/settings", settings);
  }

}

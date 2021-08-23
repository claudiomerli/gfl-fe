import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Customer} from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Array<Customer>>  {
    return this.httpClient.get<any>(environment.apiBaseurl + "/customer");
  }

  save(client: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseurl + "/customer", client);
  }
}

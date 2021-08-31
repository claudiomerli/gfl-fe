import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer";
import {SaveCustomerDto} from "../messages/customer/save-customer.dto";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {
  }

  public save(saveNewspaperDto: SaveCustomerDto): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + "/customer", saveNewspaperDto)
  }

  public update(id: number, editNewspaperDto: SaveCustomerDto): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseurl + "/customer/" + id, editNewspaperDto)
  }

  public findAll(globalSearch: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(environment.apiBaseurl + "/customer", {
      params: {globalSearch}
    })
  }

  public delete(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/customer/" + id);
  }

  public findById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(environment.apiBaseurl + "/customer/" + id);
  }
}

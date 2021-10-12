import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer";
import {SaveCustomerDto} from "../messages/customer/save-customer.dto";
import {PageResponseDto} from "../messages/page-response.dto";
import {PaginationDto} from "../messages/pagination.dto";

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

  public find(globalSearch: string, paginationDto: PaginationDto = new PaginationDto()): Observable<PageResponseDto<Customer>> {
    return this.httpClient.get<PageResponseDto<Customer>>(environment.apiBaseurl + "/customer", {
      params: {...paginationDto, globalSearch}
    })
  }

  public delete(id: number) {
    return this.httpClient.delete(environment.apiBaseurl + "/customer/" + id);
  }

  public findById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(environment.apiBaseurl + "/customer/" + id);
  }

  get(): Observable<Array<Customer>> {
    return this.httpClient.get<any>(environment.apiBaseurl + "/customer");
  }

  save(client: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseurl + "/customer", client);
  }
}

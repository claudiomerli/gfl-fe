import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FindOrderDto} from "../messages/order/find-order.dto";
import {PaginationDto} from "../messages/pagination.dto";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Order, OrderElement} from "../model/order";
import {PageResponseDto} from "../messages/page-response.dto";
import {SaveOrderDto, SaveOrderElementDto} from "../messages/order/save-order.dto";
import {SaveDraftOrderDto} from "../messages/order/save-draft-order.dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  public findById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(environment.apiBaseurl + "/order/" + id)
  }

  public find(findOrderDto: FindOrderDto, paginationDto: PaginationDto): Observable<PageResponseDto<Order>> {
    return this.httpClient.get<PageResponseDto<Order>>(environment.apiBaseurl + "/order", {
      params: {
        customerId: findOrderDto.customerId || "",
        status: findOrderDto.status || "",
        newspaperIds: findOrderDto.newspaperIds as any,
        name: findOrderDto.name || "",
        ...paginationDto
      }
    })
  }

  public save(order: SaveOrderDto): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseurl + "/order", order)
  }

  public update(id: number, order: SaveOrderDto): Observable<Order> {
    return this.httpClient.put<Order>(environment.apiBaseurl + "/order/" + id, order)
  }

  public approve(id: number) {
    return this.httpClient.put<void>(environment.apiBaseurl + "/order/" + id + "/confirm", {})
  }

  public cancel(id: number) {
    return this.httpClient.put<void>(environment.apiBaseurl + "/order/" + id + "/cancel", {})
  }

  public saveDraft(saveDraftOrdeDto: SaveDraftOrderDto): Observable<Order> {
    return this.httpClient.post<Order>(environment.apiBaseurl + "/order/draft", saveDraftOrdeDto)
  }

  public send(id: number): Observable<Order> {
    return this.httpClient.put<Order>(environment.apiBaseurl + "/order/" + id + "/send", {});
  }

  public addOrderElement(id: number, orderelement: SaveOrderElementDto): Observable<Order> {
    return this.httpClient.put<Order>(environment.apiBaseurl + "/order/" + id + "/addOrderElement", orderelement);
  }

  public deleteOrder(id: number){
    return this.httpClient.delete<void>(environment.apiBaseurl + "/order/" + id)
  }
}

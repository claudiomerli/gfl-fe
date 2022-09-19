import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {FindOrderDto} from "../messages/order/find-order.dto";
import {PaginationDto} from "../messages/pagination.dto";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Order, OrderElement} from "../model/order";
import {PageResponseDto} from "../messages/page-response.dto";
import {SaveOrderDto, SaveOrderElementDto} from "../messages/order/save-order.dto";
import {SaveDraftOrderDto} from "../messages/order/save-draft-order.dto";
import {OrderPack} from "../model/order-pack";
import {SaveRequestQuoteDto} from "../messages/order/save-request-quote.dto";
import {RequestQuote} from "../model/request-quote";

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

  public deleteOrder(id: number) {
    return this.httpClient.delete<void>(environment.apiBaseurl + "/order/" + id)
  }

  public generateFromOrderPack(orderPack: OrderPack): Observable<Order> {
    return this.httpClient.post<Order>(environment.apiBaseurl + "/order/pack/generate", {
      idOrderPack: orderPack.id,
      name: orderPack.name
    })

  }

  createRequestQuote(orderId: number, saveRequestQuoteDto: SaveRequestQuoteDto): Observable<RequestQuote> {
    return this.httpClient.post<RequestQuote>(environment.apiBaseurl + `/order/${orderId}/request-quote`, saveRequestQuoteDto)
  }

  updateRequestQuote(orderId: number, saveRequestQuoteDto: SaveRequestQuoteDto, requestQuoteId: number): Observable<RequestQuote> {
    return this.httpClient.put<RequestQuote>(environment.apiBaseurl + `/order/${orderId}/request-quote/${requestQuoteId}`, saveRequestQuoteDto)
  }

  generateRequestQuote(orderId: number, requestQuoteId: number, format: string): Observable<HttpResponse<any>> {
    return this.httpClient.get<HttpResponse<any>>(environment.apiBaseurl + `/order/${orderId}/request-quote/${requestQuoteId}/generate`, {
      params: {
        format
      },
      observe: "response",
      responseType: "blob" as "json"
    })
  }

  findRequestQuotesById(orderId: number): Observable<RequestQuote[]> {
    return this.httpClient
      .get<RequestQuote[]>(environment.apiBaseurl + `/order/${orderId}/request-quote`)
  }

  deleteRequestQuote(orderId : number, id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseurl + `/order/${orderId}/request-quote/${id}`)
  }
}

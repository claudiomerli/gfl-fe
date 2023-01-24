import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FindOrderDto} from "../messages/order/find-order.dto";
import {PaginationDto} from "../messages/common/pagination.dto";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Order, OrderElement} from "../messages/order/order";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {SaveOrderDto, SaveOrderElementDto} from "../messages/order/save-order.dto";
import {SaveDraftOrderDto} from "../messages/order/save-draft-order.dto";
import {FindOrderPackDto} from "../messages/order/find-order-pack.dto";
import {SaveOrderPackDto, SaveOrderPackElementDto} from "../messages/order/save-order-pack.dto";
import {OrderPack} from "../messages/order/order-pack";

@Injectable({
  providedIn: 'root'
})
export class OrderPackService {

  constructor(private httpClient: HttpClient) {
  }

  public findById(id: number): Observable<OrderPack> {
    return this.httpClient.get<OrderPack>(environment.apiBaseurl + "/order-pack/" + id)
  }

  public find(findOrderPackDto: FindOrderPackDto, paginationDto: PaginationDto): Observable<PageResponseDto<OrderPack>> {
    return this.httpClient.get<PageResponseDto<OrderPack>>(environment.apiBaseurl + "/order-pack", {
      params: {
        newspaperIds: findOrderPackDto.newspaperIds as any,
        globalSearch: findOrderPackDto.globalSearch || "",
        ...paginationDto
      }
    })
  }

  public save(saveOrderPackDto: SaveOrderPackDto): Observable<OrderPack> {
    return this.httpClient.post<OrderPack>(environment.apiBaseurl + "/order-pack", saveOrderPackDto)
  }

  public update(id: number, saveOrderPackDto: SaveOrderPackDto): Observable<OrderPack> {
    return this.httpClient.put<OrderPack>(environment.apiBaseurl + "/order-pack/" + id, saveOrderPackDto)
  }

  public delete(id: number){
    return this.httpClient.delete<void>(environment.apiBaseurl + "/order-pack/" + id)
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {PaginationDto} from "../messages/common/pagination.dto";
import {SearchGenericOrderDto} from "../messages/generic-order/search-generic-order.dto";
import {GenericOrder} from "../messages/generic-order/generic-order";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GenericOrderService {

  constructor(private httpClient: HttpClient) {
  }

  findById(id: number) {
    return this.httpClient.get<GenericOrder>(environment.apiBaseurl + "/generic-order/" + id);
  }

  approve(id: number) {
    return this.httpClient.put<GenericOrder>(environment.apiBaseurl + "/generic-order/" + id + "/confirm", {});
  }

  refuse(id: number) {
    return this.httpClient.put<GenericOrder>(environment.apiBaseurl + "/generic-order/" + id + "/refuse", {});
  }

  search(searchGenericOrderDto: SearchGenericOrderDto, pagination: PaginationDto) {
    return this.httpClient.get<PageResponseDto<GenericOrder>>(environment.apiBaseurl + "/generic-order", {
      params: {
        ...searchGenericOrderDto,
        ...pagination
      }
    });
  }
}

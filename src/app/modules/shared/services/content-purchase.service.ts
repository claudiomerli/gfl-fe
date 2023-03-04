import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationDto} from "../messages/common/pagination.dto";
import {environment} from "../../../../environments/environment";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {Observable} from "rxjs";
import {SearchPurchaseContentDto} from "../messages/purchase-content/search-purchase-content.dto";
import {PurchaseContent} from "../messages/purchase-content/purchase-content";
import {SavePurchaseContentDto} from "../messages/purchase-content/save-purchase-content.dto";

@Injectable({
  providedIn: 'root'
})
export class ContentPurchaseService {

  constructor(private httpClient: HttpClient) {
  }

  public findAll(searchPurchaseContent: SearchPurchaseContentDto, pagination: PaginationDto): Observable<PageResponseDto<PurchaseContent>> {
    return this.httpClient.get<PageResponseDto<PurchaseContent>>(environment.apiBaseurl + "/content-purchase", {
      params: {
        ...searchPurchaseContent,
        ...pagination
      }
    })
  }

  public findById(id: number): Observable<PurchaseContent> {
    return this.httpClient.get<PurchaseContent>(environment.apiBaseurl + `/content-purchase/${id}`)
  }

  public save(savePurchaseContentDto : SavePurchaseContentDto): Observable<PurchaseContent> {
    return this.httpClient.post<PurchaseContent>(environment.apiBaseurl + `/content-purchase`, savePurchaseContentDto)
  }

  public update(id: number, savePurchaseContentDto: SavePurchaseContentDto): Observable<PurchaseContent> {
    return this.httpClient.put<PurchaseContent>(environment.apiBaseurl + `/content-purchase/${id}`, savePurchaseContentDto)
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseurl + `/content-purchase/${id}`);
  }

}

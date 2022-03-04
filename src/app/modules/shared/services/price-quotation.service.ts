import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriceQuotationService {

  constructor(private httpClient: HttpClient) {
  }

  generatePdf(payload: any): Observable<HttpResponse<Blob>> {
    return this.httpClient.post(`${environment.apiBaseurl}/priceQuotation/generatePDF`, payload,
      {
        observe: "response",
        responseType: "blob"
      });
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewspaperDiscount} from "../messages/newspaper-discount/newspaper-discount";
import {SaveNewspaperDiscount} from "../messages/newspaper-discount/save-newspaper-discount";
import {SearchNewspaperDiscount} from "../messages/newspaper-discount/search-newspaper-discount";
import {PageResponseDto} from "../messages/common/page-response.dto";
import {PaginationDto} from "../messages/common/pagination.dto";
import {environment} from "../../../../environments/environment";
import {removeNullKeys} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class NewspaperDiscountService {

  private apiUrl = environment.apiBaseurl + '/newspaper-discounts';

  constructor(private http: HttpClient) {
  }

  save(saveNewspaperDiscount: SaveNewspaperDiscount): Observable<NewspaperDiscount> {
    return this.http.post<NewspaperDiscount>(this.apiUrl, saveNewspaperDiscount);
  }

  update(id: number, saveNewspaperDiscount: SaveNewspaperDiscount): Observable<NewspaperDiscount> {
    return this.http.put<NewspaperDiscount>(`${this.apiUrl}/${id}`, saveNewspaperDiscount);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findById(id: number): Observable<NewspaperDiscount> {
    return this.http.get<NewspaperDiscount>(`${this.apiUrl}/${id}`);
  }

  find(searchNewspaperDiscount: SearchNewspaperDiscount, pagination: PaginationDto): Observable<PageResponseDto<NewspaperDiscount>> {
    return this.http.get<PageResponseDto<NewspaperDiscount>>(this.apiUrl, {
      params: {
        ...removeNullKeys(searchNewspaperDiscount),
        ...pagination
      }
    });
  }
}

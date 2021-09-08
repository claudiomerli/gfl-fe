import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Customer} from "../../../shared/model/customer";
import {CustomerService} from "../../../shared/services/customer.service";
import {EditorService} from "../../../shared/services/editor.service";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {User} from "../../../shared/model/user";
import {Newspaper} from "../../../shared/model/newspaper";
import {SearchContentDto} from "../../../shared/messages/search-content.dto";

@Component({
  selector: 'app-content-search-filter',
  templateUrl: './content-search-filter.component.html',
  styleUrls: ['./content-search-filter.component.scss']
})
export class ContentSearchFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private editorService: EditorService, private newspaperService: NewspaperService) {
  }

  customer$ = new BehaviorSubject<Customer[]>([]);
  editor$ = new BehaviorSubject<User[]>([]);
  newspaper$ = new BehaviorSubject<Newspaper[]>([]);

  @Output()
  submitSearchForm = new EventEmitter<SearchContentDto>();

  ngOnInit(): void {
    this.customerService.find("", PaginationDto.buildMaxValueOnePage()).subscribe(value => {
      this.customer$.next(value.content)
    })

    this.editorService.find("", PaginationDto.buildMaxValueOnePage()).subscribe(value => {
      this.editor$.next(value.content)
    })

    this.newspaperService.find("", PaginationDto.buildMaxValueOnePage()).subscribe(value => {
      this.newspaper$.next(value.content)
    })
  }

  searchForm = this.formBuilder.group({
    customerId: this.formBuilder.control(null),
    editorId: this.formBuilder.control(null),
    newspaperId: this.formBuilder.control(null),
    globalSearch: this.formBuilder.control(null),
    status: this.formBuilder.control(null),
    deliveryDateFrom: this.formBuilder.control(null),
    deliveryDateTo: this.formBuilder.control(null),
    createdDateFrom: this.formBuilder.control(null),
    createdDateTo: this.formBuilder.control(null),
  })

  onSubmit() {
    this.submitSearchForm.emit(this.searchForm.value as SearchContentDto)
  }
}

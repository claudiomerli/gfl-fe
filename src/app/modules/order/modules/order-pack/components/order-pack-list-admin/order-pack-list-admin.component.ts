import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Newspaper} from "../../../../../shared/model/newspaper";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {debounceTime, switchMap} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {PaginationDto} from "../../../../../shared/messages/pagination.dto";
import {NewspaperService} from "../../../../../shared/services/newspaper.service";
import {PageResponseDto} from "../../../../../shared/messages/page-response.dto";
import {Order} from "../../../../../shared/model/order";
import {OrderPack} from "../../../../../shared/model/order-pack";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {OrderPackService} from "../../../../../shared/services/order-pack.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-pack-list-admin',
  templateUrl: './order-pack-list-admin.component.html',
  styleUrls: ['./order-pack-list-admin.component.scss']
})
export class OrderPackListAdminComponent implements OnInit {

  constructor(private newspaperService: NewspaperService, private orderPackService: OrderPackService, private router : Router) {
  }

  ngOnInit(): void {
    this.newspaperInput.valueChanges
      .pipe(
        debounceTime(200),
        switchMap(search => {
          if (search === "") {
            this.newspapers = []
            return EMPTY
          } else {
            return this.newspaperService.findForAutocomplete(
              {name: search},
              new PaginationDto(0, 50, "ASC", "name"))
          }
        })
      ).subscribe(result => {
      this.newspapers = result.content.filter(e => !this.orderPackSearchForm.controls.newspapers.value?.find(selected => e.id == selected.id))
    })

    this.orderPackSearchForm.valueChanges.pipe(
      (debounceTime(200))
    ).subscribe(() => {
      this.search()
    })

    this.search()
  }

  orderPackSearchForm = new FormGroup({
    globalSearch: new FormControl(''),
    newspapers: new FormControl<Newspaper[]>([])
  });


  newspaperInput: FormControl = new FormControl<string>("")
  newspapers: Newspaper[] = []

  newspaperSelected($event: MatAutocompleteSelectedEvent, input: HTMLInputElement) {
    this.newspaperInput.setValue("")
    input.value = ""

    this.orderPackSearchForm.controls.newspapers?.setValue([...(this.orderPackSearchForm.controls.newspapers.value as Newspaper[]), $event.option.value])
  }

  removeNewspaper(newspaperId: number) {
    this.orderPackSearchForm.controls.newspapers.setValue(this.orderPackSearchForm.controls.newspapers.value?.filter(element => element.id != newspaperId) || null);
  }

  onSortChange($event: Sort) {
    if ($event.direction != '') {
      this.actualPagination.sortBy = $event.active
      this.actualPagination.sortDirection = $event.direction?.toUpperCase()
    } else {
      this.actualPagination.sortBy = "id"
      this.actualPagination.sortDirection = "ASC"
    }

    this.search()
  }

  onPageChange($event: PageEvent) {
    this.actualPagination.page = $event.pageIndex
    this.actualPagination.pageSize = $event.pageSize
    this.search()
  }

  search() {
    let value = this.orderPackSearchForm.value;
    this.orderPackService
      .find({
        globalSearch: value.globalSearch,
        newspaperIds: value.newspapers?.map(n => n.id)
      }, this.actualPagination)
      .subscribe(result => {
        this.orderPacks = result
      })
  }

  orderPacks?: PageResponseDto<OrderPack>

  actualPagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "DESC"
  }

  newOrderPack() {
    this.router.navigate(['/orders/pack/create'])
  }
}

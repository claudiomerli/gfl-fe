import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FindOrderDto} from "../../../shared/messages/order/find-order.dto";
import {Form, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {EMPTY, fromEvent} from "rxjs";
import {debounceTime, filter, switchMap} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {User} from "../../../shared/model/user";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {orderStatus} from "../../../shared/utils/utils";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {Newspaper} from "../../../shared/model/newspaper";

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.scss']
})
export class OrderFilterComponent implements OnInit, AfterViewInit {

  @Output() filterChanged = new EventEmitter<FindOrderDto>()
  @Output() newOrder = new EventEmitter<void>()

  form = new FormGroup({
    name: new FormControl<string | null>(null),
    customer: new FormControl<User | null>(null),
    status: new FormControl<string | null>(null),
    newspapers: new FormControl<Newspaper[]>([])
  })

  //Objects for autocomplete
  customers: User[] = []
  customerInput: FormControl = new FormControl<string>("")
  displayFullnameCustomer = (customer: User) => customer?.fullname || ""

  //Object for newspaper
  newspaperInput: FormControl = new FormControl<string>("")
  newspapers: Newspaper[] = []


  orderStatus = orderStatus

  constructor(private userService: UserService, private newspaperService: NewspaperService) {
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.emitChange();
      })
    this.emitChange();
  }

  emitChange() {
    this.filterChanged.emit({
      customerId: (this.form.value?.customer as User)?.id || null,
      status: this.form.value.status!,
      newspaperIds: this.form.value.newspapers!.map(value => value.id),
      name : this.form.value.name!
    })
  }

  ngAfterViewInit(): void {
    this.customerInput.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (search !== "") {
          this.userService.findForAutocomplete(search, "CUSTOMER",
            new PaginationDto(0, 50, "ASC", "fullname")
          ).subscribe(value => {
            this.customers = value.content
          })
        } else {
          this.form.controls.customer.setValue(null)
          this.customers = []
        }
      })

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
      this.newspapers = result.content.filter(e => !this.form.controls.newspapers.value?.find(selected => e.id == selected.id))
    })
  }


  newspaperSelected($event: MatAutocompleteSelectedEvent, input: HTMLInputElement) {
    this.newspaperInput.setValue("")
    input.value = ""

    this.form.controls.newspapers?.setValue([...(this.form.controls.newspapers.value as Newspaper[]), $event.option.value])
  }

  removeNewspaper(newspaperId: number) {
    this.form.controls.newspapers.setValue(this.form.controls.newspapers.value?.filter(element => element.id != newspaperId) || null);
  }

  customerOptionSelected($event: MatAutocompleteSelectedEvent) {
    this.form.controls.customer.setValue($event.option.value)
  }
}

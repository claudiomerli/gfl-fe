import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../../../shared/messages/auth/user";
import {validateObject} from "../../../../../shared/utils/utils";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../../../shared/messages/common/pagination.dto";
import {UserService} from "../../../../../shared/services/user.service";
import {NewspaperService} from "../../../../../shared/services/newspaper.service";
import {Newspaper} from "../../../../../shared/messages/newspaper/newspaper";
import {NewspaperDiscountService} from "../../../../../shared/services/newspaper-discount.service";
import {NewspaperDiscount} from "../../../../../shared/messages/newspaper-discount/newspaper-discount";
import {PageResponseDto} from "../../../../../shared/messages/common/page-response.dto";
import {MatDialog} from "@angular/material/dialog";
import {
  NewspaperDiscountFormDialogComponent
} from "../../components/newspaper-discount-form-dialog/newspaper-discount-form-dialog.component";
import {ConfirmDialogComponent} from "../../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-newspaper-discount-dashboard',
  templateUrl: './newspaper-discount-dashboard.component.html',
  styleUrls: ['./newspaper-discount-dashboard.component.scss']
})
export class NewspaperDiscountDashboardComponent implements OnInit {
  customers: User[] = [];
  newspapers: Newspaper[] = [];

  constructor(private userService: UserService,
              private newspaperService: NewspaperService,
              private newspaperDiscountService: NewspaperDiscountService,
              public dialog: MatDialog
  ) {
  }

  filterForm = new FormGroup({
    customer: new FormControl<User | string | null>(null, validateObject),
    newspaper: new FormControl<Newspaper | string | null>(null, validateObject)
  })

  displayFullnameCustomer = (editor: User) => editor?.fullname || ""
  displayNewspaperName = (newspaper: Newspaper) => newspaper?.name || ""

  pagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "DESC"
  }

  newspaperDiscount: PageResponseDto<NewspaperDiscount> = new PageResponseDto<NewspaperDiscount>();

  ngOnInit(): void {
    this.filterForm.controls.customer.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (typeof search === "string") {
          if (search !== "") {
            this.userService.findForAutocomplete(search, "CUSTOMER", new PaginationDto(0, 10, "ASC", "fullname"))
              .subscribe(value => {
                this.customers = value.content
              })
          } else {
            this.filterForm.controls.customer.setValue(null)
            this.customers = []
          }
        }
      })

    this.filterForm.controls.newspaper.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (typeof search === "string") {
          if (search !== "") {
            this.newspaperService.findForAutocomplete({
                name: search
              }, new PaginationDto(0, 10, "ASC", "name")
            ).subscribe(value => {
              this.newspapers = value.content
            })
          } else {
            this.filterForm.controls.newspaper.setValue(null)
            this.newspapers = []
          }
        }
      })

    this.filterForm.valueChanges.subscribe(value => {
      if (this.filterForm.valid) {
        this.fetch()
      }
    })

    this.fetch()
  }

  fetch() {
    if (this.filterForm.valid) {
      this.newspaperDiscountService.find({
        customerId: (this.filterForm.controls.customer.value as User)?.id,
        newspaperId: (this.filterForm.controls.newspaper.value as Newspaper)?.id
      }, this.pagination).subscribe(response => {
        this.newspaperDiscount = response;
      })
    }

  }

  onCreateNew() {
    this.dialog.open(NewspaperDiscountFormDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.fetch()
      }
    });
  }

  onEdit(newspaperDiscount: NewspaperDiscount) {
    this.dialog.open(NewspaperDiscountFormDialogComponent, {
      data: newspaperDiscount
    }).afterClosed().subscribe(result => {
      if (result) {
        this.fetch()
      }
    });
  }

  onDelete(element: NewspaperDiscount) {
    this.dialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di voler eliminare lo sconto?"
    }).afterClosed().subscribe(value => {
      if (value) {
        this.newspaperDiscountService.delete(element.id).subscribe(() => this.fetch())
      }
    })

  }

  onPageChange($event: PageEvent) {
    this.pagination.page = $event.pageIndex;
    this.pagination.pageSize = $event.pageSize;
    this.fetch();
  }
}

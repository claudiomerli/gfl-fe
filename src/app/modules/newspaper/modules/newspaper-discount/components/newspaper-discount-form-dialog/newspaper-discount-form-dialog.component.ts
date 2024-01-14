import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NewspaperDiscount} from "../../../../../shared/messages/newspaper-discount/newspaper-discount";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../shared/messages/auth/user";
import {validateObject} from "../../../../../shared/utils/utils";
import {Newspaper} from "../../../../../shared/messages/newspaper/newspaper";
import {NewspaperService} from "../../../../../shared/services/newspaper.service";
import {NewspaperDiscountService} from "../../../../../shared/services/newspaper-discount.service";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../../../shared/messages/common/pagination.dto";
import {UserService} from "../../../../../shared/services/user.service";

@Component({
  selector: 'app-newspaper-discount-form-dialog',
  templateUrl: './newspaper-discount-form-dialog.component.html',
  styleUrls: ['./newspaper-discount-form-dialog.component.scss']
})
export class NewspaperDiscountFormDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewspaperDiscountFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newspaperDiscount: NewspaperDiscount,
    private newspaperDiscountService: NewspaperDiscountService,
    private newspaperService : NewspaperService,
    private userService : UserService
  ) {
  }

  newspaperDiscountForm = new FormGroup({
    customer: new FormControl<User | string | null>(null, [Validators.required, validateObject]),
    newspaper: new FormControl<Newspaper | string | null>(null, [Validators.required, validateObject]),
    discountPercentage: new FormControl<number | null>(null)
  })

  displayFullnameCustomer = (editor: User) => editor?.fullname || ""
  displayNewspaperName = (newspaper: Newspaper) => newspaper?.name || ""
  customers: User[] = [];
  newspapers: Newspaper[] = [];

  ngOnInit(): void {
    this.newspaperDiscountForm.controls.customer.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (typeof search === "string") {
          if (search !== "") {
            this.userService.findForAutocomplete(search, "CUSTOMER", new PaginationDto(0, 10, "ASC", "fullname"))
              .subscribe(value => {
                this.customers = value.content
              })
          } else {
            this.newspaperDiscountForm.controls.customer.setValue(null)
            this.customers = []
          }
        }
      })

    this.newspaperDiscountForm.controls.newspaper.valueChanges
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
            this.newspaperDiscountForm.controls.newspaper.setValue(null)
            this.newspapers = []
          }
        }
      })

    if(this.newspaperDiscount){
      this.newspaperDiscountForm.patchValue({
        newspaper: this.newspaperDiscount.newspaper,
        customer: this.newspaperDiscount.customer,
        discountPercentage: this.newspaperDiscount.discountPercentage
      })
    }
  }


  onSave() {
    if (this.newspaperDiscountForm.valid) {
      if (this.newspaperDiscount) {
        this.newspaperDiscountService.update(this.newspaperDiscount.id, {
          discountPercentage: this.newspaperDiscountForm.value.discountPercentage!,
          newspaperId: (this.newspaperDiscountForm.value.newspaper as Newspaper).id!,
          customerId: (this.newspaperDiscountForm.value.customer as User).id!
        }).subscribe(() => {
          this.dialogRef.close(true)
        })
      } else {
        this.newspaperDiscountService.save({
          discountPercentage: this.newspaperDiscountForm.value.discountPercentage!,
          newspaperId: (this.newspaperDiscountForm.value.newspaper as Newspaper).id!,
          customerId: (this.newspaperDiscountForm.value.customer as User).id!
        }).subscribe(() => {
          this.dialogRef.close(true)
        })
      }
    }

  }

}

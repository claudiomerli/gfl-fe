import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Newspaper} from "../../../shared/model/newspaper";
import {debounceTime, switchMap} from "rxjs/operators";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {EMPTY} from "rxjs";
import {SaveOrderDto} from "../../../shared/messages/order/save-order.dto";
import {Order} from "../../../shared/model/order";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  @Input() orderToEdit?: Order
  @Output() formSubmit = new EventEmitter<SaveOrderDto>()
  @Output() approve = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
  @Output() saveDraft = new EventEmitter<SaveOrderDto>()
  @Output() sendOrder = new EventEmitter<SaveOrderDto>()

  constructor(private newspaperService: NewspaperService) {
  }

  ngOnInit(): void {
    if (this.orderToEdit) {
      this.orderToEdit.orderElements.forEach(this.addOrderElement)
      this.orderForm.patchValue(this.orderToEdit)
      if (this.orderToEdit.status != "DRAFT") {
        this.orderForm.disable()
      }
    } else {
      this.addOrderElement()
    }
  }

  validateNewspaper: ValidatorFn = control => {
    if (!(typeof control.value === "object")) {
      return {wrongType: "Option not selected"}
    }
    return null
  }

  orderForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    note: new FormControl<string | null>(null),
    orderElements: new FormArray<FormGroup>([])
  })


  newspapersAutocomplete: Newspaper[] = [];
  displayNewspaperName: (newspaper: Newspaper) => string = (newspaper) => newspaper?.name;

  get total(): number {
    return this.orderForm.controls.orderElements.controls.reduce((previousValue, currentValue) => {
      if (currentValue.controls.newspaper.value?.costSell && currentValue.controls.contentNumber?.value) {
        return previousValue + (currentValue.controls.contentNumber.value * currentValue.controls.newspaper.value.costSell)
      } else {
        return previousValue
      }
    }, 0)
  }

  addOrderElement = () => {
    const newFormOrderElement = new FormGroup({
      newspaper: new FormControl<Newspaper | null>(null, [Validators.required, this.validateNewspaper]),
      contentNumber: new FormControl<number>(0, [Validators.required, Validators.min(1)])
    })

    newFormOrderElement.controls.newspaper.valueChanges
      .pipe(
        debounceTime(200),
        switchMap((change: any) => {
            if (typeof change === "string" && change != "") {
              return this.newspaperService.findForAutocomplete({name: change}, {
                page: 0,
                pageSize: 50,
                sortBy: "name",
                sortDirection: "ASC"
              })
            } else {
              return EMPTY
            }
          }
        )
      )
      .subscribe(result => {
        this.newspapersAutocomplete = result.content
      })

    this.orderForm.controls.orderElements.push(newFormOrderElement)

  }

  removeOrderElement(i: number) {
    this.orderForm.controls.orderElements.removeAt(i)
  }

  emptyArray() {
    this.newspapersAutocomplete = []
  }

  // onFormSubmit() {
  //   if (this.orderForm.valid) {
  //     this.formSubmit.emit({
  //       note: this.orderForm.getRawValue().note,
  //       elements: this.orderForm.getRawValue().orderElements!.map(oe => {
  //         return {
  //           contentNumber: oe.contentNumber,
  //           newspaperId: oe.newspaper.id
  //         }
  //       })
  //     })
  //   }
  //
  // }

  onApprove() {
    this.approve.emit()
  }

  onCancel() {
    this.cancel.emit()
  }

  onSend() {
    if (this.orderForm.valid)
      this.sendOrder.emit(this.buildDto())
  }

  onSaveDraft() {
    if (this.orderForm.valid)
      this.saveDraft.emit(this.buildDto())
  }

  buildDto() : SaveOrderDto {
    return {
      name: this.orderForm.value.name!,
      note: this.orderForm.value.note,
      elements: this.orderForm.value.orderElements!.map(oe => {
        return {
          contentNumber: oe.contentNumber,
          newspaperId: oe.newspaper.id
        }
      })
    }
  }
}

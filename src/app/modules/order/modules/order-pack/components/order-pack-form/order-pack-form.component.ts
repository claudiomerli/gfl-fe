import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../../../../shared/messages/order/order";
import {NewspaperService} from "../../../../../shared/services/newspaper.service";
import {FormArray, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Newspaper} from "../../../../../shared/messages/newspaper/newspaper";
import {debounceTime, switchMap} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {OrderPack} from "../../../../../shared/messages/order/order-pack";
import {SaveOrderPackDto} from "../../../../../shared/messages/order/save-order-pack.dto";

@Component({
  selector: 'app-order-pack-form',
  templateUrl: './order-pack-form.component.html',
  styleUrls: ['./order-pack-form.component.scss']
})
export class OrderPackFormComponent implements OnInit {

  @Input() orderPackToEdit?: OrderPack
  @Output() save = new EventEmitter<SaveOrderPackDto>()
  @Output() delete = new EventEmitter<void>()

  constructor(private newspaperService: NewspaperService) {
  }

  ngOnInit(): void {
    if (this.orderPackToEdit) {
      this.orderPackToEdit.orderElements.forEach(this.addOrderElement)
      this.orderPackForm.patchValue(this.orderPackToEdit)
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

  orderPackForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null),
    price: new FormControl<number | null>(null, Validators.required),
    orderElements: new FormArray<FormGroup>([])
  })


  newspapersAutocomplete: Newspaper[] = [];
  displayNewspaperName: (newspaper: Newspaper) => string = (newspaper) => newspaper?.name;

  get total(): number {
    return this.orderPackForm.controls.orderElements.controls.reduce((previousValue, currentValue) => {
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
            if (typeof change === "string") {
              if (change != "") {
                return this.newspaperService.findForAutocomplete({name: change}, {
                  page: 0,
                  pageSize: 50,
                  sortBy: "name",
                  sortDirection: "ASC"
                })
              } else {
                this.newspapersAutocomplete = []
                return EMPTY
              }
            } else {
              return EMPTY
            }
          }
        )
      )
      .subscribe(result => {
        this.newspapersAutocomplete = result.content
      })

    this.orderPackForm.controls.orderElements.push(newFormOrderElement)
  }

  removeOrderElement(i: number) {
    this.orderPackForm.controls.orderElements.removeAt(i)
  }

  emptyArray() {
    this.newspapersAutocomplete = []
  }


  onSave() {
    if (this.orderPackForm.valid)
      this.save.emit(this.buildDto())
  }

  buildDto(): SaveOrderPackDto {
    return {
      name: this.orderPackForm.value.name!,
      description: this.orderPackForm.value.description!,
      price: this.orderPackForm.value.price!,
      elements: this.orderPackForm.value.orderElements!.map(oe => {
        return {
          contentNumber: oe.contentNumber,
          newspaperId: oe.newspaper.id
        }
      })
    }
  }

  onDelete() {
    this.delete.emit()
  }

}

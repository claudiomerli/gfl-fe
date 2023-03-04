import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Newspaper} from "../../../../../shared/messages/newspaper/newspaper";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {debounceTime, switchMap} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {PaginationDto} from "../../../../../shared/messages/common/pagination.dto";
import {NewspaperService} from "../../../../../shared/services/newspaper.service";
import {SavePurchaseContentDto} from "../../../../../shared/messages/purchase-content/save-purchase-content.dto";
import {PurchaseContent} from "../../../../../shared/messages/purchase-content/purchase-content";

@Component({
  selector: 'app-content-purchase-form',
  templateUrl: './content-purchase-form.component.html',
  styleUrls: ['./content-purchase-form.component.scss']
})
export class ContentPurchaseFormComponent implements OnInit {

  purchaseContentForm = new FormGroup({
    amount: new FormControl<number | null>(null, [Validators.required]),
    contentNumber: new FormControl<number | null>(null, [Validators.required]),
    newspapers: new FormControl<Newspaper[]>([]),
    note: new FormControl<string>("")
  })

  @Output() save = new EventEmitter<SavePurchaseContentDto>();
  @Output() delete = new EventEmitter<void>();

  @Input() purchaseContentToEdit?: PurchaseContent;

  constructor(private newspaperService: NewspaperService) {
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
              new PaginationDto(0, 10, "ASC", "name"))
          }
        }))
      .subscribe(result => {
        this.newspapers = result.content.filter(e => !this.purchaseContentForm.controls.newspapers.value?.find(selected => e.id == selected.id))
      })

    if (this.purchaseContentToEdit) {
      this.purchaseContentForm.patchValue({
        amount: this.purchaseContentToEdit.amount,
        contentNumber: this.purchaseContentToEdit.contentNumber,
        newspapers: this.purchaseContentToEdit.newspapers,
        note: this.purchaseContentToEdit.note
      })
    }
  }

  newspaperInput: FormControl = new FormControl<string>("")
  newspapers: Newspaper[] = []

  removeNewspaper(id: number) {
    this.purchaseContentForm.controls.newspapers.setValue(this.purchaseContentForm.controls.newspapers.value?.filter(element => element.id != id) || null);
  }

  newspaperSelected($event: MatAutocompleteSelectedEvent, newspaperInputElement: HTMLInputElement) {
    this.newspaperInput.setValue("")
    newspaperInputElement.value = ""
    this.purchaseContentForm.controls.newspapers?.setValue([...(this.purchaseContentForm.controls.newspapers.value as Newspaper[]), $event.option.value])
  }

  formSubmit() {
    if (this.purchaseContentForm.valid) {
      this.save.emit({
        amount: this.purchaseContentForm.value.amount!,
        contentNumber: this.purchaseContentForm.value.contentNumber!,
        newspapers: this.purchaseContentForm.value.newspapers?.map(value => value.id) || [],
        note: this.purchaseContentForm.value.note || ""
      })
    }

  }

  onDelete() {
    this.delete.emit()
  }
}

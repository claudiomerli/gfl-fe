import {Component, OnInit} from '@angular/core';
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {Newspaper} from "../../../shared/model/newspaper";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-price-quotation',
  templateUrl: './price-quotation.component.html',
  styleUrls: ['./price-quotation.component.scss']
})
export class PriceQuotationComponent implements OnInit {

  constructor(private newspaperService: NewspaperService,
              private formBuilder: FormBuilder) {
  }

  newspaperList: (Newspaper | undefined)[] = [];
  newspaper: (Newspaper | undefined);

  form = this.formBuilder.group({
    newspaperId: ['', Validators.required]
  });

  priceQuotationTemp = new FormGroup({
    nameNewspaper: new FormControl(''),
    costEach: new FormControl(''),
    costSell: new FormControl(''),
    numberOfEditors: new FormControl(''),
    expense: new FormControl(''),
    earn: new FormControl(''),
    revenue: new FormControl(''),
  })


  ngOnInit(): void {
  }

  loadNewspaper(event: any) {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(event.key)) {
      this.newspaperService
        .find(event.target.value)
        .subscribe(value => {
          this.newspaperList = value.content
        })
      this.form.patchValue({newspaperId: ''});
    }
  }

  onSelectedValueNewspaper(newspaperSelected: any) {
    this.form.patchValue({newspaperId: newspaperSelected.id});
  }


  loadNewspaperById() {
    this.newspaperService.findById(this.form.value.newspaperId)
      .subscribe(rs => {
        this.newspaper = rs;
        this.priceQuotationTemp.patchValue({
          costEach: rs.costEach,
          costSell: rs.costSell,
          nameNewspaper: rs.name
        })
      })
  }

  onSubmit() {
    this.priceQuotationTemp.patchValue({
      expense: this.priceQuotationTemp.value.numberOfEditors * this.priceQuotationTemp.value.costEach,
      revenue: this.priceQuotationTemp.value.numberOfEditors * this.priceQuotationTemp.value.costSell,
      earn: this.priceQuotationTemp.value.revenue - this.priceQuotationTemp.value.expense,
    })
  }
}

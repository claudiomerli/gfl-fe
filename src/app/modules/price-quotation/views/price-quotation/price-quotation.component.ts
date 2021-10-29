import {Component, OnInit} from '@angular/core';
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {Newspaper} from "../../../shared/model/newspaper";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable'

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
    numberOfEditors: new FormControl('',Validators.required),
    expense: new FormControl(''),
    revenue: new FormControl(''),
    earn: new FormControl(''),
  })

  priceQuotationTableTemp: any = [];

  ngOnInit(): void {
  }

  loadNewspaper(event: any) {
    this.newspaper = undefined
    this.priceQuotationTemp.reset();
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

    if(this.priceQuotationTemp.invalid){
      return
    }

    this.priceQuotationTemp.patchValue({
      expense: this.priceQuotationTemp.value.numberOfEditors * this.priceQuotationTemp.value.costEach,
      revenue: this.priceQuotationTemp.value.numberOfEditors * this.priceQuotationTemp.value.costSell,
    })
    this.priceQuotationTemp.patchValue({
      earn: this.priceQuotationTemp.value.revenue - this.priceQuotationTemp.value.expense,
    })


    this.priceQuotationTableTemp.push({
      nameNewspaper: this.priceQuotationTemp.value.nameNewspaper,
      costEach: this.priceQuotationTemp.value.costEach,
      costSell: this.priceQuotationTemp.value.costSell,
      numberOfEditors: this.priceQuotationTemp.value.numberOfEditors,
      expense: this.priceQuotationTemp.value.expense,
      revenue: this.priceQuotationTemp.value.revenue,
      earn: this.priceQuotationTemp.value.earn,
    });

  }

  deleteElement(priceQuotation: any) {

    const index = this.priceQuotationTableTemp.indexOf(priceQuotation);
    if (index > -1) {
      this.priceQuotationTableTemp.splice(index, 1);
    }
  }

  generateAndDownloadPdf() {

    let nameFile = "Preventivo" + new Date().toLocaleDateString();
    const doc = new jsPDF()
    autoTable(doc, {html: '#my-table'})
    doc.save(nameFile + "pdf")
  }
}

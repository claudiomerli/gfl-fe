import {Component, OnInit} from '@angular/core';
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {Newspaper} from "../../../shared/model/newspaper";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable'
import {TopicService} from "../../../shared/services/topic.service";
import {Topic} from "../../../shared/model/topic";
import {SelectDto} from "../../../shared/messages/select.dto";

@Component({
  selector: 'app-price-quotation',
  templateUrl: './price-quotation.component.html',
  styleUrls: ['./price-quotation.component.scss']
})
export class PriceQuotationComponent implements OnInit {

  newspaperList: (SelectDto | undefined)[] = [];
  topicList: (Topic | undefined)[] = [];

  form = this.formBuilder.group({
    newspaperId: [''],
    topicId: [''],
    maxBudget: [''],
  });

  priceQuotations = new FormArray([])
  formPriceQuotations = this.formBuilder.group ({
    priceQuotations: this.priceQuotations
  })

  priceQuotationTableTemp: any = [];
  search: boolean = false;


  constructor(private newspaperService: NewspaperService,
              private topicService: TopicService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.newspaperService.findForSelect().subscribe(data => this.newspaperList = data);
    this.topicService.findAll().subscribe(data => this.topicList = data);

  }

  searchNewspaper(): void {
    if(this.form.valid) {
      this.newspaperService.findPriceQuotation(this.form.value).subscribe(data => {
        data.content.forEach(newspaper => {
          (this.formPriceQuotations.controls.priceQuotations as FormArray)
            .push(new FormGroup({
            nameNewspaper: new FormControl(newspaper.name),
            costEach: new FormControl(newspaper.costEach),
            costSell: new FormControl(newspaper.costSell),
            numberOfEditors: new FormControl('',Validators.required),
            expense: new FormControl(''),
            revenue: new FormControl(''),
            earn: new FormControl(''),
          }));
        });
        this.search = true;
      });
    }
  }

  calcolaPreventivo(indice: number) {
    let newspaper = (this.formPriceQuotations.controls.priceQuotations as FormArray).controls[indice].value;
    newspaper.expense = newspaper.numberOfEditors * newspaper.costEach;
    newspaper.revenue = newspaper.numberOfEditors * newspaper.costSell;
    newspaper.earn = newspaper.revenue - newspaper.expense;
    this.priceQuotationTableTemp.push({
      nameNewspaper: newspaper.nameNewspaper,
      costEach: newspaper.costEach,
      costSell: newspaper.costSell,
      numberOfEditors: newspaper.numberOfEditors,
      expense: newspaper.expense,
      revenue: newspaper.revenue,
      earn: newspaper.earn,
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

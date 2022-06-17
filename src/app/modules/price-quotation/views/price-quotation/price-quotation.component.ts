import {Component, OnInit} from '@angular/core';
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {TopicService} from "../../../shared/services/topic.service";
import {Topic} from "../../../shared/model/topic";
import {SelectDto} from "../../../shared/messages/select.dto";
import {PriceQuotationService} from "../../../shared/services/price-quotation.service";
import {saveAs} from "file-saver";
import {SearchNewspaperDto} from "../../../shared/messages/newspaper/search-newspaper.dto";
import {PaginationDto} from "../../../shared/messages/pagination.dto";

@Component({
  selector: 'app-price-quotation',
  templateUrl: './price-quotation.component.html',
  styleUrls: ['./price-quotation.component.scss']
})
export class PriceQuotationComponent implements OnInit {

  newspaperList: (SelectDto | undefined)[] = [];
  topicList: (Topic | undefined)[] = [];

  formPriceQuotations = this.formBuilder.group({
    priceQuotations: new UntypedFormArray([]),
  })

  exportForm = new UntypedFormGroup({
    header: new UntypedFormControl('', [Validators.required]),
    customerName: new UntypedFormControl('', [Validators.required]),
    activity: new UntypedFormControl('', [Validators.required]),
    tax: new UntypedFormControl('', [Validators.required]),
    signature: new UntypedFormControl('', [Validators.required])
  })

  get priceQuotations(): UntypedFormArray {
    return this.formPriceQuotations.controls['priceQuotations'] as UntypedFormArray
  }

  priceQuotationTable: any = [];
  search: boolean = false;


  constructor(private newspaperService: NewspaperService,
              private topicService: TopicService,
              private formBuilder: UntypedFormBuilder,
              private priceQuotationService: PriceQuotationService) {
  }

  ngOnInit(): void {
    this.newspaperService.findForSelect().subscribe(data => this.newspaperList = data);
    this.topicService.findAll().subscribe(data => this.topicList = data);

  }



  searchNewspaper($event: SearchNewspaperDto) {
    Object.keys($event).forEach(chiave => {
      // @ts-ignore
      if ($event[chiave] == null) {
        // @ts-ignore
        $event[chiave] = '';
      }
    });
    this.newspaperService.find($event, new PaginationDto(0, undefined, 'ASC', 'name'))
      .subscribe(res => {
        this.formPriceQuotations.controls.priceQuotations = new UntypedFormArray(
          res.content.map(newspaper =>
            new UntypedFormGroup({
              id: new UntypedFormControl(newspaper.id),
              nameNewspaper: new UntypedFormControl(newspaper.name),
              costEach: new UntypedFormControl(newspaper.costEach),
              costSell: new UntypedFormControl(newspaper.costSell),
              numberOfEditors: new UntypedFormControl('', Validators.required),
              expense: new UntypedFormControl(''),
              revenue: new UntypedFormControl(''),
              earn: new UntypedFormControl(''),
            })
          )
        );
        this.search = true;
      })
  }

  calcolaPreventivo(indice: number) {
    let newspaper = (this.formPriceQuotations.controls.priceQuotations as UntypedFormArray).controls[indice].value;
    newspaper.expense = newspaper.numberOfEditors * newspaper.costEach;
    newspaper.revenue = newspaper.numberOfEditors * newspaper.costSell;
    newspaper.earn = newspaper.revenue - newspaper.expense;
    this.priceQuotationTable.push({
      id: newspaper.id,
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
    const index = this.priceQuotationTable.indexOf(priceQuotation);
    if (index > -1) {
      this.priceQuotationTable.splice(index, 1);
    }
  }

  handleUpload(event: any, inputName: string) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.exportForm.controls[inputName].setValue(reader.result)
    };
  }

  generate() {
    this.priceQuotationService.generatePdf({
      rows: this.priceQuotationTable,
      otherInformation: this.exportForm.value
    }).subscribe((result) => {
      saveAs(result.body as Blob, "preventivo.pdf")
    })
  }
}

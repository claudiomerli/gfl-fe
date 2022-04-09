import {Component, OnInit} from '@angular/core';
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TopicService} from "../../../shared/services/topic.service";
import {Topic} from "../../../shared/model/topic";
import {SelectDto} from "../../../shared/messages/select.dto";
import {PriceQuotationService} from "../../../shared/services/price-quotation.service";
import {saveAs} from "file-saver";

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

  formPriceQuotations = this.formBuilder.group({
    priceQuotations: new FormArray([])
  })

  exportForm = new FormGroup({
    header: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    activity: new FormControl('', [Validators.required]),
    tax: new FormControl('', [Validators.required]),
    signature: new FormControl('', [Validators.required])
  })

  get priceQuotations(): FormArray {
    return this.formPriceQuotations.controls['priceQuotations'] as FormArray
  }

  priceQuotationTable: any = [];
  search: boolean = false;


  constructor(private newspaperService: NewspaperService,
              private topicService: TopicService,
              private formBuilder: FormBuilder,
              private priceQuotationService: PriceQuotationService) {
  }

  ngOnInit(): void {
    this.newspaperService.findForSelect().subscribe(data => this.newspaperList = data);
    this.topicService.findAll().subscribe(data => this.topicList = data);

  }

  searchNewspaper(): void {
    if (this.form.valid) {
      this.newspaperService.findPriceQuotation(this.form.value)
        .subscribe(data => {
          this.formPriceQuotations.controls.priceQuotations = new FormArray(
            data.content.map(newspaper =>
              new FormGroup({
                id: new FormControl(newspaper.id),
                nameNewspaper: new FormControl(newspaper.name),
                costEach: new FormControl(newspaper.costEach),
                costSell: new FormControl(newspaper.costSell),
                numberOfEditors: new FormControl('', Validators.required),
                expense: new FormControl(''),
                revenue: new FormControl(''),
                earn: new FormControl(''),
              })
            )
          );
          this.search = true;
        });
    }
  }

  calcolaPreventivo(indice: number) {
    let newspaper = (this.formPriceQuotations.controls.priceQuotations as FormArray).controls[indice].value;
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
  //
  // testate = [{name:'ciao'}, {name:'salve'}, {name:'ugo'}, {name:'luigi'}];
  //
  // test: OperatorFunction<string, readonly any[]> = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? []
  //       : this.testate.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   )
  //
  //
  //
  // formatter = (x: any) => {
  //   console.log(x);
  //   return x.name;
  // }
  // public model: any;
}

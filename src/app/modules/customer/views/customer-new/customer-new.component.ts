import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {CustomerService} from "../../../shared/services/customer.service";
import {ProjectService} from "../../../shared/services/project.service";
import {ContentRulesService} from "../../../shared/services/content-rules.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit {

  form = {} as FormGroup;
  customerList = {} as Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private contentRulesService: ContentRulesService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.customerList = this.customerService.get();
    this.form = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: ['', Validators.required],
        contentRulesId: ['']
      }),
      contentRules: this.formBuilder.group({
        title: ['', Validators.required],
        linkUrl: ['', Validators.required],
        linkText: ['', Validators.required],
        body: ['', Validators.required],
        maxCharacterBodyLength: [0, Validators.required]
      })
    });
  }

  submit() {
    if(this.form.valid) {
      this.contentRulesService.save(this.form.value.contentRules).subscribe(data => {
        (this.form.controls.customer as FormGroup).controls.contentRulesId.setValue(data.id);
        this.customerService.save(this.form.value.customer).subscribe(data => this.router.navigate(['customer']));
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {CustomerService} from "../../../shared/services/customer.service";
import {ProjectService} from "../../../shared/services/project.service";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  form = {} as FormGroup;
  customerList = {} as Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.customerList = this.customerService.get();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      customerId: ['', Validators.required]
    });
  }

  submit() {
    if(this.form.valid) {
      this.projectService.save(this.form.value).subscribe(data => console.log('Salvato', data));
    }
  }



}

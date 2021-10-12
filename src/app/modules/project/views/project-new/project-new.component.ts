import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../shared/services/customer.service";
import {Observable} from "rxjs";
import {ProjectService} from "../../../shared/services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {

  form = {} as FormGroup;
  customerList = {} as Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit(): void {
    this.customerList = this.customerService.get();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      customerId: ['', Validators.required]
    });
  }

  submit() {
    if(this.form.valid) {
      this.projectService.save(this.form.value).subscribe(data => this.router.navigate(['projects']));
    }
  }

}

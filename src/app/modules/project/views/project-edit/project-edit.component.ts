import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../shared/services/customer.service";
import {ProjectService} from "../../../shared/services/project.service";
import {Customer} from "../../../shared/model/customer";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  form = {} as FormGroup;
  customerList: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      customerId: ['', Validators.required]
    });
    this.customerService.find('').subscribe(
      value => this.customerList = value.content
    );
    this.projectService.findById(this.activatedRoute.snapshot.params['id']).subscribe(
      value => {
        this.form.setValue({
          name: value.name,
          customerId: value.customer?.id
        })
      }
    );
  }

  submit() {
    if (this.form.valid) {
      this.projectService.update(this.activatedRoute.snapshot.params['id'], this.form.value)
        .subscribe(data => this.router.navigate(["/projects"]));
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CustomerService} from "../../../shared/services/customer.service";
import {ProjectService} from "../../../shared/services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../../shared/model/project";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  project?: Project;


  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.projectService.findById(this.activatedRoute.snapshot.params['id']).subscribe(
      value => {
        this.project = value;
      }
    );
  }

  submit(value: any) {
    if (value && this.project?.id) {
      this.projectService.update(this.project?.id, value)
        .subscribe(() => this.router.navigate(["/projects"]));
    }
  }
}

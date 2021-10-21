import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../../shared/services/project.service";

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService) {
  }

  ngOnInit(): void {
  }

  submit(value: any) {
    this.projectService.save(value).subscribe(() => this.router.navigate(['projects']));
  }
}

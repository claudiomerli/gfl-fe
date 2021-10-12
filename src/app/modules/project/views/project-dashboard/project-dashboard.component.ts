import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from "../../../shared/services/project.service";
import {Project} from "../../../shared/model/project";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit, OnDestroy {

  projectList = [] as Array<Project>;
  projectSubscription = {} as Subscription;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectSubscription = this.projectService.get().subscribe(data => this.projectList = data.content);
  }

  ngOnDestroy(): void {
    if(this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }

}

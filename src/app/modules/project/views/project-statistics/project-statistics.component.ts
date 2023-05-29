import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ProjectService} from "../../../shared/services/project.service";
import {Project} from "../../../shared/messages/project/project";

@Component({
  selector: 'app-project-statistics',
  templateUrl: './project-statistics.component.html',
  styleUrls: ['./project-statistics.component.scss']
})
export class ProjectStatisticsComponent implements OnInit {


  graphUrls = [
    'https://metabase.tilinkotool.it/public/question/67ec50b2-6add-4c1a-82ff-5c8687bf275a', //url
    'https://metabase.tilinkotool.it/public/question/7ca87ba0-3fbb-4580-bead-221c66cfe2ee', //ancore
    'https://metabase.tilinkotool.it/public/question/3c5bfa83-8c87-4d20-aa03-61facf62b6b7', // pubblicazioni
  ]
  embeddedUrlGraph: SafeUrl[] = []
  projectToView?: Project;


  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, public projectService: ProjectService) {

  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id")!;
    this.projectService.findById(parseInt(id))
      .subscribe(project => {
        this.projectToView = project
      })
    this.embeddedUrlGraph = this.graphUrls.map(
      value => this.sanitizer.bypassSecurityTrustResourceUrl(`${value}?project_id=${id}#hide_parameters=project_id`)
    )
  }

  print() {
    window.print()
  }

}

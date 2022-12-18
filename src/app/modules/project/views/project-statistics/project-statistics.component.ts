import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-project-statistics',
  templateUrl: './project-statistics.component.html',
  styleUrls: ['./project-statistics.component.scss']
})
export class ProjectStatisticsComponent implements OnInit {

  embeddedUrl?: SafeUrl

  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.embeddedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://metabase.tilinkotool.it/public/dashboard/ff180b18-c2ae-4377-bf72-7a7f19cd204f?project_id=${id}#hide_parameters=project_id`)
  }

}

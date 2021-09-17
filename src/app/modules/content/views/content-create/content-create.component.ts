import {Component, OnInit} from '@angular/core';
import {ContentService} from "../../../shared/services/content.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent implements OnInit {

  constructor(private contentService: ContentService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit($event: any) {
    this.contentService
      .save($event)
      .subscribe(() => {
        console.log("Content saved")
        this.router.navigate(["/contents"])
      });
  }
}

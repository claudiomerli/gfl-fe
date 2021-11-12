import {Component, OnInit} from '@angular/core';
import {ContentService} from "../../../shared/services/content.service";
import {Router} from "@angular/router";
import {ContentSaveEvent} from "../../components/content-form/content-form.component";

@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent implements OnInit {
  id?: number;

  constructor(private contentService: ContentService, private router: Router) {
  }

  ngOnInit(): void {
  }

  save(contentSaveEvent: ContentSaveEvent, navigate: boolean) {
    const obs = contentSaveEvent.id ? this.contentService.update(contentSaveEvent.id, contentSaveEvent.value) : this.contentService.save(contentSaveEvent.value);
    obs.subscribe((res) => {
      console.log("Content saved", res)
      this.id = res.id
      if(navigate) {
        this.router.navigate(["/contents"])
      }
    });
  }

}

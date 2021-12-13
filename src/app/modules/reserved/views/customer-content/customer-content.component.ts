import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContentService} from "../../../shared/services/content.service";
import {BehaviorSubject, zip} from "rxjs";
import {Content} from "../../../shared/model/content";

@Component({
  selector: 'app-customer-content',
  templateUrl: './customer-content.component.html',
  styleUrls: ['./customer-content.component.scss']
})
export class CustomerContentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private contentService: ContentService) {
  }

  contentToken: string | undefined | null;
  id: number | undefined | null;
  content$ = new BehaviorSubject<Content | undefined>(undefined)
  notes: string | undefined = ""

  ngOnInit(): void {
    zip(
      this.activatedRoute.queryParamMap,
      this.activatedRoute.paramMap
    ).subscribe(results => {
      let queries = results[0];
      let params = results[1];

      this.contentToken = queries.get("contentToken");
      this.id = parseInt(params.get("id") || "");
      this.loadContent()
    })
  }

  private loadContent() {
    if (this.id && this.contentToken) {
      this.contentService.getContentCustomer(this.id, this.contentToken)
        .subscribe((content) => {
          this.content$.next(content)
          this.notes = content.customerNotes;
        })
    }
  }

  saveNotes() {
    if (this.id && this.contentToken && this.notes) {
      this.contentService.saveNotes_old(this.id, this.notes, this.contentToken).subscribe(() => {
        this.loadContent();
      })
    }
  }

  approve() {
    if (this.id && this.contentToken) {
      this.contentService.approveContentCustomer_old(this.id, this.contentToken).subscribe(() => {
        this.loadContent();
      })
    }
  }
}

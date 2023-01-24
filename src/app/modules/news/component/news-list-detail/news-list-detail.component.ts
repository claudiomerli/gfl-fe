import {Component, Input, OnInit} from '@angular/core';
import {News} from "../../../shared/messages/news/news";

@Component({
  selector: 'app-news-list-detail',
  templateUrl: './news-list-detail.component.html',
  styleUrls: ['./news-list-detail.component.scss']
})
export class NewsListDetailComponent implements OnInit {
  @Input() newsElement!: News;

  showOption = false;

  get newsPreview(): any {
    if (this.newsElement)
      return new DOMParser()
        .parseFromString(this.newsElement.body, "text/html")
        .documentElement.textContent?.substring(0, 900) + "...";

  }

  constructor() {
  }

  ngOnInit(): void {
  }

}

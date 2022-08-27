import {Component, OnInit} from '@angular/core';
import {SaveNewsDto} from "../../../shared/messages/news/save-news.dto";
import {NewsService} from "../../../shared/services/news.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {

  constructor(private newsService: NewsService, private router: Router) {
  }

  ngOnInit(): void {
  }

  save($event: SaveNewsDto) {
    this.newsService.save($event)
      .subscribe((saved) => {
        this.router.navigate([`/news/${saved.id}`])
      })
  }
}

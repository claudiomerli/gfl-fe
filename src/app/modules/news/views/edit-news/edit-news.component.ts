import {Component, OnInit} from '@angular/core';
import {SaveNewsDto} from "../../../shared/messages/news/save-news.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../../../shared/services/news.service";
import {News} from "../../../shared/messages/news/news";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {
  public newsToEdit: News | undefined;

  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    let snapshot = this.activatedRoute.snapshot;
    this.newsService.findById(parseInt(snapshot.paramMap.get("id") as string)).subscribe((news) => {
      this.newsToEdit = news
    })
  }

  save($event: SaveNewsDto) {
    this.newsService.update(this.newsToEdit?.id as number, $event)
      .subscribe((saved) => {
        this.router.navigate([`/news/${saved.id}`])
      })

  }
}

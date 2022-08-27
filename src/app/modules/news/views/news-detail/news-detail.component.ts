import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../../shared/services/news.service";
import {ActivatedRoute, Router} from "@angular/router";
import {News} from "../../../shared/model/news";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  news: News | undefined = undefined

  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute, private router: Router, private matDialog: MatDialog) {


  }

  ngOnInit(): void {
    let paramMap = this.activatedRoute.snapshot.paramMap;
    this.newsService.findById(parseInt(paramMap.get("id") as string)).subscribe((news) => {
      this.news = news
    })
  }

  openEdit() {
    this.router.navigate(['/news', this.news?.id, 'edit'])
  }

  delete() {
    let matDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di voler eliminare la news?"
    });
    matDialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.newsService.delete(this.news?.id as number).subscribe(() => {
          this.router.navigate(['/news'])
        })
      }
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../../shared/services/news.service";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {News} from "../../../shared/messages/news/news";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  globalSearch: string = "";
  actualPagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "createdDate",
    sortDirection: "DESC"
  }

  news: PageResponseDto<News> = new PageResponseDto<News>();
  isLoading = false;


  constructor(private newsService: NewsService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchNews()
  }

  private fetchNews() {
    this.isLoading = true
    this.newsService.findAll(this.globalSearch, this.actualPagination)
      .subscribe(news => {
        this.isLoading = false
        this.news = news;
      },(err) =>{
        this.isLoading = false
      })
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/news', id])
  }

  createNews() {
    this.router.navigate(['/news', 'create'])
  }

  changePage($event: PageEvent) {
    this.actualPagination.page = $event.pageIndex
    this.actualPagination.pageSize = $event.pageSize
    this.fetchNews()
  }
}

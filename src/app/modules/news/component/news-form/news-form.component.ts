import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SaveNewsDto} from "../../../shared/messages/news/save-news.dto";
import {News} from "../../../shared/messages/news/news";

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  newsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl(''),
    image: new FormControl(''),
  });

  @Output() formSubmitted = new EventEmitter<SaveNewsDto>()

  @Input() news: News | undefined

  constructor() {
  }

  ngOnInit(): void {
    if (this.news) {
      this.newsForm.patchValue({
        title: this.news.title,
        body: this.news.body,
        image: this.news.image
      })
    }
  }

  sumbitForm() {
    if (this.newsForm.valid) {
      let value = this.newsForm.value;
      this.formSubmitted.emit({
        title: value.title as string,
        body: value.body as string,
        image: value.image as string,
      })
    }
  }

  imageSelected($event: string) {
    this.newsForm.controls.image.setValue($event)
  }
}

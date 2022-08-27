import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListDetailComponent } from './news-list-detail.component';

describe('NewsListDetailComponent', () => {
  let component: NewsListDetailComponent;
  let fixture: ComponentFixture<NewsListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsListDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

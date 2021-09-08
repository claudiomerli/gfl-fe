import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSearchFilterComponent } from './content-search-filter.component';

describe('ContentSearchFilterComponent', () => {
  let component: ContentSearchFilterComponent;
  let fixture: ComponentFixture<ContentSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

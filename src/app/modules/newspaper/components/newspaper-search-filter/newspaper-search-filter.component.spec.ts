import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperSearchFilterComponent } from './newspaper-search-filter.component';

describe('NewspaperSearchFilterComponent', () => {
  let component: NewspaperSearchFilterComponent;
  let fixture: ComponentFixture<NewspaperSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperSearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspaperSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

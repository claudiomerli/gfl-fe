import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperDiscountDashboardComponent } from './newspaper-discount-dashboard.component';

describe('NewspaperDiscountDashboardComponent', () => {
  let component: NewspaperDiscountDashboardComponent;
  let fixture: ComponentFixture<NewspaperDiscountDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperDiscountDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewspaperDiscountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

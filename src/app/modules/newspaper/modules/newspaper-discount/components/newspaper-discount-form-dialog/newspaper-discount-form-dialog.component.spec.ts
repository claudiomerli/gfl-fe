import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperDiscountFormDialogComponent } from './newspaper-discount-form-dialog.component';

describe('NewspaperDiscountFormDialogComponent', () => {
  let component: NewspaperDiscountFormDialogComponent;
  let fixture: ComponentFixture<NewspaperDiscountFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperDiscountFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewspaperDiscountFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

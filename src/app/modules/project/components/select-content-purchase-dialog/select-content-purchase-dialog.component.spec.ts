import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContentPurchaseDialogComponent } from './select-content-purchase-dialog.component';

describe('SelectContentPurchaseDialogComponent', () => {
  let component: SelectContentPurchaseDialogComponent;
  let fixture: ComponentFixture<SelectContentPurchaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectContentPurchaseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectContentPurchaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

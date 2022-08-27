import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDraftDialogComponent } from './order-draft-dialog.component';

describe('OrderDraftDialogComponent', () => {
  let component: OrderDraftDialogComponent;
  let fixture: ComponentFixture<OrderDraftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDraftDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDraftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

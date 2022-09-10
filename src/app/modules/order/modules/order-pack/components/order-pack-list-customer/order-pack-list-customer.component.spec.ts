import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackListCustomerComponent } from './order-pack-list-customer.component';

describe('OrderPackListCustomerComponent', () => {
  let component: OrderPackListCustomerComponent;
  let fixture: ComponentFixture<OrderPackListCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPackListCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPackListCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

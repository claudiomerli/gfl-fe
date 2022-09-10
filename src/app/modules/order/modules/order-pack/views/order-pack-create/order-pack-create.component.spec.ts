import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackCreateComponent } from './order-pack-create.component';

describe('OrderPackCreateComponent', () => {
  let component: OrderPackCreateComponent;
  let fixture: ComponentFixture<OrderPackCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPackCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

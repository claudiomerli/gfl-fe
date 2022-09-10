import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackEditComponent } from './order-pack-edit.component';

describe('OrderPackEditComponent', () => {
  let component: OrderPackEditComponent;
  let fixture: ComponentFixture<OrderPackEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPackEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

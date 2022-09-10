import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackFormComponent } from './order-pack-form.component';

describe('OrderPackFormComponent', () => {
  let component: OrderPackFormComponent;
  let fixture: ComponentFixture<OrderPackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPackFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

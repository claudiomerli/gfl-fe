import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackListComponent } from './order-pack-list.component';

describe('OrderPackListComponent', () => {
  let component: OrderPackListComponent;
  let fixture: ComponentFixture<OrderPackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPackListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

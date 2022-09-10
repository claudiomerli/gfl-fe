import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackListAdminComponent } from './order-pack-list-admin.component';

describe('OrderPackListAdminComponent', () => {
  let component: OrderPackListAdminComponent;
  let fixture: ComponentFixture<OrderPackListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPackListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPackListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

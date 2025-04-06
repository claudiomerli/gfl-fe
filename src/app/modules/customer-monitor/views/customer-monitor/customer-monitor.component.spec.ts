import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMonitorComponent } from './customer-monitor.component';

describe('CustomerMonitorComponent', () => {
  let component: CustomerMonitorComponent;
  let fixture: ComponentFixture<CustomerMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

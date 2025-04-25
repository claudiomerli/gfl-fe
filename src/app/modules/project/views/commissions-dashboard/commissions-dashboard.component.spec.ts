import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionsDashboardComponent } from './commissions-dashboard.component';

describe('CommissionsDashboardComponent', () => {
  let component: CommissionsDashboardComponent;
  let fixture: ComponentFixture<CommissionsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

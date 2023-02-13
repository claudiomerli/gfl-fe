import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlesDashboardComponent } from './titles-dashboard.component';

describe('TitlesDashboardComponent', () => {
  let component: TitlesDashboardComponent;
  let fixture: ComponentFixture<TitlesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitlesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitlesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

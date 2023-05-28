import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSpinnerComponent } from './auto-spinner.component';

describe('AutoSpinnerComponent', () => {
  let component: AutoSpinnerComponent;
  let fixture: ComponentFixture<AutoSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

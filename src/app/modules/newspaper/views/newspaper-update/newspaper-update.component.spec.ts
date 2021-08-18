import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperUpdateComponent } from './newspaper-update.component';

describe('NewspaperUpdateComponent', () => {
  let component: NewspaperUpdateComponent;
  let fixture: ComponentFixture<NewspaperUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspaperUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

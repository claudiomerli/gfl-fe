import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperSaveFormComponent } from './newspaper-save-form.component';

describe('NewspaperSaveFormComponent', () => {
  let component: NewspaperSaveFormComponent;
  let fixture: ComponentFixture<NewspaperSaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperSaveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspaperSaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperDescriptionDialogComponent } from './newspaper-description-dialog.component';

describe('NewspaperDescriptionDialogComponent', () => {
  let component: NewspaperDescriptionDialogComponent;
  let fixture: ComponentFixture<NewspaperDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperDescriptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewspaperDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

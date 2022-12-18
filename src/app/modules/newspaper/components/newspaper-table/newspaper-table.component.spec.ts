import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperTableComponent } from './newspaper-table.component';

describe('NewspaperTableComponent', () => {
  let component: NewspaperTableComponent;
  let fixture: ComponentFixture<NewspaperTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewspaperTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

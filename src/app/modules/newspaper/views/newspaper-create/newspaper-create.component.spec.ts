import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperCreateComponent } from './newspaper-create.component';

describe('NewspaperCreateComponent', () => {
  let component: NewspaperCreateComponent;
  let fixture: ComponentFixture<NewspaperCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspaperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

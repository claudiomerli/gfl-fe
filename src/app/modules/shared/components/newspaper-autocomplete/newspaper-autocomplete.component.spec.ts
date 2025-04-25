import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperAutocompleteComponent } from './newspaper-autocomplete.component';

describe('NewspaperAutocompleteComponent', () => {
  let component: NewspaperAutocompleteComponent;
  let fixture: ComponentFixture<NewspaperAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewspaperAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorUpdateFormComponent } from './editor-update-form.component';

describe('EditorUpdateFormComponent', () => {
  let component: EditorUpdateFormComponent;
  let fixture: ComponentFixture<EditorUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

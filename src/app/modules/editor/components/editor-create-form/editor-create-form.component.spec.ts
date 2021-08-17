import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCreateFormComponent } from './editor-create-form.component';

describe('EditorCreateFormComponent', () => {
  let component: EditorCreateFormComponent;
  let fixture: ComponentFixture<EditorCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorCreateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHintTemplateDialogFormComponent } from './content-hint-template-dialog-form.component';

describe('ContentHintTemplateDialogFormComponent', () => {
  let component: ContentHintTemplateDialogFormComponent;
  let fixture: ComponentFixture<ContentHintTemplateDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentHintTemplateDialogFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentHintTemplateDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

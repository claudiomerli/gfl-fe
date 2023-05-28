import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAssistantDialogComponent } from './content-assistant-dialog.component';

describe('ContentAssistantDialogComponent', () => {
  let component: ContentAssistantDialogComponent;
  let fixture: ComponentFixture<ContentAssistantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentAssistantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentAssistantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

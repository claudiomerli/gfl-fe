import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContentPreviewComponent } from './project-content-preview.component';

describe('ProjectContentPreviewComponent', () => {
  let component: ProjectContentPreviewComponent;
  let fixture: ComponentFixture<ProjectContentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContentPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

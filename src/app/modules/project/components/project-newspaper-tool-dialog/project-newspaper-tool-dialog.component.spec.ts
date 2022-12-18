import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNewspaperToolDialogComponent } from './project-newspaper-tool-dialog.component';

describe('ProjectNewspaperToolDialogComponent', () => {
  let component: ProjectNewspaperToolDialogComponent;
  let fixture: ComponentFixture<ProjectNewspaperToolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectNewspaperToolDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectNewspaperToolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

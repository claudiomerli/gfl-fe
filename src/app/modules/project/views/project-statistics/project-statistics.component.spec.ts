import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatisticsComponent } from './project-statistics.component';

describe('ProjectStatisticsComponent', () => {
  let component: ProjectStatisticsComponent;
  let fixture: ComponentFixture<ProjectStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTemplateDashboardComponent } from './video-template-dashboard.component';

describe('VideoTemplateDashboardComponent', () => {
  let component: VideoTemplateDashboardComponent;
  let fixture: ComponentFixture<VideoTemplateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTemplateDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoTemplateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
